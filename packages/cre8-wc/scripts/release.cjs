#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const VersionBumper = require('./version-bump.cjs');

/**
 * Automated release script for CI/CD pipelines
 * Combines version bump, build, and optional publishing
 */

class ReleaseManager {
  constructor() {
    this.bumper = new VersionBumper();
  }

  /**
   * Execute shell command with error handling
   */
  exec(command, options = {}) {
    const { silent = false } = options;
    try {
      const result = execSync(command, { 
        encoding: 'utf8',
        stdio: silent ? 'pipe' : 'inherit'
      });
      return result?.trim();
    } catch (error) {
      console.error(`❌ Command failed: ${command}`);
      throw error;
    }
  }

  /**
   * Check if working directory is clean
   */
  isWorkingDirectoryClean() {
    try {
      const status = this.exec('git status --porcelain', { silent: true });
      return !status;
    } catch {
      return false;
    }
  }

  /**
   * Check if we're on the main branch
   */
  isOnMainBranch() {
    try {
      const branch = this.exec('git rev-parse --abbrev-ref HEAD', { silent: true });
      return ['main', 'master'].includes(branch);
    } catch {
      return false;
    }
  }

  /**
   * Run pre-release checks
   */
  runPreReleaseChecks() {
    console.log('🔍 Running pre-release checks...\n');

    // Check git status
    if (!this.isWorkingDirectoryClean()) {
      throw new Error('Working directory is not clean. Please commit or stash changes.');
    }
    console.log('✅ Working directory is clean');

    // Check branch (optional warning)
    if (!this.isOnMainBranch()) {
      console.log('⚠️  Not on main/master branch - proceeding anyway');
    } else {
      console.log('✅ On main branch');
    }

    // Check if git remote exists
    try {
      this.exec('git remote get-url origin', { silent: true });
      console.log('✅ Git remote configured');
    } catch {
      console.log('⚠️  No git remote configured');
    }

    console.log();
  }

  /**
   * Build the project
   */
  /**
   * Sync every workspace package that releases in lockstep with cre8-wc.
   * cre8-mcp keeps its `workspace:^` dependency on cre8-wc - pnpm publish
   * rewrites it to the real version at pack time.
   */
  syncWorkspaceVersions(newVersion) {
    console.log('🔗 Syncing lockstep package versions...');

    const reactPkgPath = path.join(__dirname, '..', 'react-wrappers', 'package.json');
    const reactPkg = JSON.parse(fs.readFileSync(reactPkgPath, 'utf8'));
    reactPkg.version = newVersion;
    reactPkg.dependencies['@tmorrow/cre8-wc'] = `^${newVersion}`;
    fs.writeFileSync(reactPkgPath, JSON.stringify(reactPkg, null, 2) + '\n');
    console.log(`✅ @tmorrow/cre8-react -> ${newVersion}`);

    const mcpPkgPath = path.join(__dirname, '..', '..', 'cre8-mcp', 'package.json');
    const mcpPkg = JSON.parse(fs.readFileSync(mcpPkgPath, 'utf8'));
    mcpPkg.version = newVersion;
    if (mcpPkg.dependencies && mcpPkg.dependencies['@tmorrow/cre8-react']) {
      mcpPkg.dependencies['@tmorrow/cre8-react'] = `^${newVersion}`;
    }
    fs.writeFileSync(mcpPkgPath, JSON.stringify(mcpPkg, null, 2) + '\n');
    console.log(`✅ @tmorrow/cre8-mcp -> ${newVersion}\n`);
  }

  build() {
    console.log('🔨 Building all aligned artifacts (libs, storybooks, mcp)...');
    this.exec('pnpm -w run build:all');
    console.log('✅ Build completed\n');
    this.checkSkills();
  }

  /**
   * Audit agent skills against the catalog this release just regenerated.
   *
   * Reported, never fatal. Skills are documentation an agent acts on verbatim,
   * so a stale one does real damage - by 2.3.6 the cre8-a2ui skill named 38
   * components (46%) that no longer existed, and agents carrying it scored
   * below agents given no CRE8 knowledge at all. But the skills that drift
   * are synced from a claude.ai account, not built from this repo, so this
   * release cannot fix them and must not be blocked by them.
   */
  checkSkills() {
    console.log('📚 Auditing agent skills against the regenerated catalog...');
    try {
      this.exec('node a2ui/check-skill-fidelity.mjs');
      console.log('✅ Skills agree with the catalog\n');
    } catch (error) {
      console.log('⚠️  Skills contradict the catalog - see above.');
      console.log('   Not blocking the release: these are account-synced, not built here.');
      console.log('   Fix them at the source, or move their API tables out and let the MCP answer.\n');
    }
  }

  /**
   * Run tests
   */
  test() {
    console.log('🧪 Running tests...');
    try {
      this.exec('npm test');
      console.log('✅ All tests passed\n');
    } catch (error) {
      console.log('❌ Tests failed\n');
      throw error;
    }
  }

  /**
   * Run linting
   */
  lint() {
    console.log('🔍 Running linter...');
    try {
      this.exec('npm run lint');
      console.log('✅ Linting passed\n');
    } catch (error) {
      console.log('❌ Linting failed\n');
      throw error;
    }
  }

  /**
   * Commit version bump
   */
  commitVersionBump(version) {
    console.log('📝 Committing version bump...');
    // Stage repo-wide, not just the two package.json files: the post-bump
    // rebuild above touches mcp-manifest.json, both custom-elements.json
    // copies, the a2ui catalog/kg, react-manifest.json, and the eval's
    // oracle fixtures under evals/cre8-a2ui-vs-mcp - all of it needs to
    // land in the same commit as the version bump, or the published
    // package and the committed tree disagree about what was released.
    // react-wrappers/package.json is the one exception: generated and
    // gitignored on purpose, npm publishes it from disk without it ever
    // being committed.
    this.exec('git -C ../.. add -A');
    this.exec(`git commit -m "chore: bump version to ${version}"`);
    console.log('✅ Version bump committed\n');
  }

  /**
   * Create and push git tag
   */
  createAndPushTag(version) {
    console.log('🏷️  Creating git tag...');
    this.exec(`git tag v${version}`);
    console.log(`✅ Created tag v${version}`);
    
    try {
      this.exec(`git push origin v${version}`);
      console.log('✅ Pushed tag to remote\n');
    } catch {
      console.log('⚠️  Failed to push tag to remote\n');
    }
  }

  /**
   * Generate changelog entry
   */
  generateChangelogEntry(version) {
    console.log('📋 Generating changelog entry...');
    try {
      const commits = this.bumper.getCommitsSinceTag();
      const entry = this.formatChangelogEntry(version, commits);
      
      // Could write to CHANGELOG.md here
      console.log('Generated changelog entry:');
      console.log(entry);
      console.log();
      
      return entry;
    } catch (error) {
      console.log('⚠️  Failed to generate changelog\n');
      return null;
    }
  }

  /**
   * Format changelog entry
   */
  formatChangelogEntry(version, commits) {
    const date = new Date().toISOString().split('T')[0];
    let entry = `## [${version}] - ${date}\n\n`;

    const categories = {
      'Breaking Changes': [],
      'Features': [],
      'Bug Fixes': [],
      'Other': []
    };

    commits.forEach(commit => {
      if (/^(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?!:/.test(commit)) {
        categories['Breaking Changes'].push(commit);
      } else if (/^feat(\(.+\))?:/.test(commit)) {
        categories['Features'].push(commit);
      } else if (/^fix(\(.+\))?:/.test(commit)) {
        categories['Bug Fixes'].push(commit);
      } else {
        categories['Other'].push(commit);
      }
    });

    Object.entries(categories).forEach(([category, items]) => {
      if (items.length > 0) {
        entry += `### ${category}\n\n`;
        items.forEach(item => {
          entry += `- ${item}\n`;
        });
        entry += '\n';
      }
    });

    return entry;
  }

  /**
   * Main release workflow
   */
  async release(options = {}) {
    const {
      skipChecks = false,
      skipTests = false,
      skipBuild = false,
      skipLint = false,
      dryRun = false,
      publish = false,
      push = false
    } = options;

    console.log('🚀 Starting release process...\n');

    try {
      // Pre-release checks
      if (!skipChecks) {
        this.runPreReleaseChecks();
      }

      // Run linting
      if (!skipLint) {
        this.lint();
      }

      // Run tests
      if (!skipTests) {
        this.test();
      }

      // Build project
      if (!skipBuild) {
        this.build();
      }

      // Determine version bump
      console.log('📦 Determining version bump...\n');
      const newVersion = options.version || this.bumper.run({ dryRun: true });
      if (options.version) {
        console.log(`📌 Using explicit version: ${newVersion}`);
      }

      if (newVersion === this.bumper.pkg.version) {
        console.log('✨ No version bump needed. Release completed.');
        return newVersion;
      }

      if (dryRun) {
        console.log('🔍 Dry run completed - no changes made');
        return newVersion;
      }

      // Bump version
      console.log('📈 Bumping version...\n');
      if (options.version) {
        const pkgPath = path.join(__dirname, '..', 'package.json');
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        pkg.version = newVersion;
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
        console.log(`✅ Set version to ${newVersion}`);
      } else {
        this.bumper.run({ dryRun: false });
      }

      // Sync react-wrappers and cre8-mcp to the same version BEFORE the
      // commit, so the committed tree matches what gets published.
      this.syncWorkspaceVersions(newVersion);

      // The main build ran before the bump, so everything whose content
      // embeds the library version or the current component set is now
      // stale: mcp-manifest.json, both custom-elements.json copies, the
      // a2ui catalog/kg, and react-manifest.json. Re-running only
      // `build:a2ui` here (the previous fix attempt) was not enough - it
      // regenerates the catalog FROM mcp-manifest.json, which itself was
      // never rebuilt post-bump, so the catalog kept restating the old
      // version. That precise gap shipped two consecutive stale releases
      // (2.3.3 and 2.3.4 both published with a catalog one version behind
      // and missing components that had already landed in source). Redo
      // the full build so every derived layer is generated from the
      // post-bump tree, not just the a2ui slice of it.
      this.exec('pnpm -w run build:all');

      // The eval's oracle fixtures (evals/cre8-a2ui-vs-mcp) are their own
      // copy of catalog.compact.json/inert-props.json/containment.json,
      // fanned out per task. build:all doesn't touch them, but CI's
      // "graph regenerates to what is committed" job checks them against
      // the same rebuilt graph - sync-oracle.sh --check fails otherwise.
      this.exec('cd ../../evals/cre8-a2ui-vs-mcp && python3 oracle/build_oracle.py && ./sync-oracle.sh');

      // Commit version bump
      this.commitVersionBump(newVersion);

      // Generate changelog
      this.generateChangelogEntry(newVersion);

      // Create and push tag
      this.createAndPushTag(newVersion);

      // Push changes
      if (push) {
        console.log('⬆️  Pushing changes...');
        try {
          this.exec('git push');
          console.log('✅ Pushed changes to remote\n');
        } catch {
          console.log('⚠️  Failed to push changes to remote\n');
        }
      }

      // Publish (if requested)
      if (publish) {
        console.log('📦 Publishing @tmorrow/cre8-wc...');
        try {
          this.exec('npm publish --access public');
          console.log('✅ @tmorrow/cre8-wc published successfully\n');
        } catch (error) {
          console.log('❌ Failed to publish @tmorrow/cre8-wc\n');
          throw error;
        }

        // react wrappers (version already synced pre-commit)
        console.log('📦 Publishing @tmorrow/cre8-react...');
        try {
          this.exec('cd react-wrappers && npm publish --access public');
          console.log('✅ @tmorrow/cre8-react published successfully\n');
        } catch (error) {
          console.log('❌ Failed to publish @tmorrow/cre8-react\n');
          throw error;
        }

        // cre8-mcp: pnpm publish rewrites the workspace:^ dependency on
        // cre8-wc to the real version at pack time (npm publish would ship
        // the literal "workspace:^" and break installs).
        console.log('📦 Publishing @tmorrow/cre8-mcp...');
        try {
          this.exec('cd ../cre8-mcp && pnpm publish --access public --no-git-checks');
          console.log('✅ @tmorrow/cre8-mcp published successfully\n');
        } catch (error) {
          console.log('❌ Failed to publish @tmorrow/cre8-mcp\n');
          throw error;
        }
      }

      console.log(`🎉 Release ${newVersion} completed successfully!`);
      return newVersion;

    } catch (error) {
      console.error('\n❌ Release failed:', error.message);
      process.exit(1);
    }
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes('--dry-run') || args.includes('-d'),
    skipChecks: args.includes('--skip-checks'),
    skipTests: args.includes('--skip-tests'),
    skipBuild: args.includes('--skip-build'),
    skipLint: args.includes('--skip-lint'),
    publish: args.includes('--publish') || args.includes('-p'),
    push: args.includes('--push'),
    // Explicit version override, e.g. --version 2.2.0. The commit analyzer
    // only recognises conventional-commit prefixes, which this repo does not
    // use consistently, so feature releases need the explicit form.
    version: args.includes('--version') ? args[args.indexOf('--version') + 1] : null,
    help: args.includes('--help') || args.includes('-h')
  };

  if (options.version && !/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(options.version)) {
    console.error(`❌ Invalid --version value: ${options.version}`);
    process.exit(1);
  }

  if (options.help) {
    console.log(`
🚀 Automated Release Manager

Usage: node scripts/release.js [options]

Options:
  -d, --dry-run      Show what would be done without making changes
  -p, --publish      Publish to npm after successful release
  --push             Push changes and tags to git remote
  --skip-checks      Skip pre-release checks
  --skip-tests       Skip running tests
  --skip-build       Skip building the project
  --skip-lint        Skip linting
  -h, --help         Show this help message

Examples:
  node scripts/release.js --dry-run     # Preview release process
  node scripts/release.js --publish     # Full release with npm publish
  npm run release                       # Run via npm script
  npm run release:publish               # Release and publish

The release process:
  1. Pre-release checks (git status, branch
  4. Build project
  5. Analyze commits and bump version
  6. Commit version change
  7. Generate changelog entry
  8. Create and push git tag
  9. Optionally publish to npm
`);
    process.exit(0);
  }

  const manager = new ReleaseManager();
  manager.release(options);
}

module.exports = ReleaseManager;