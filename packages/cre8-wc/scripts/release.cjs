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
  build() {
    console.log('🔨 Building project...');
    this.exec('npm run build');
    console.log('✅ Build completed\n');
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
    this.exec('git add package.json react-wrappers/package.json');
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
      const newVersion = this.bumper.run({ dryRun: true });
      
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
      this.bumper.run({ dryRun: false });

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

        // Sync version and publish react wrappers
        console.log('📦 Publishing @tmorrow/cre8-react...');
        try {
          const reactPkgPath = path.join(__dirname, '..', 'react-wrappers', 'package.json');
          const reactPkg = JSON.parse(fs.readFileSync(reactPkgPath, 'utf8'));
          reactPkg.version = newVersion;
          reactPkg.dependencies['@tmorrow/cre8-wc'] = `^${newVersion}`;
          fs.writeFileSync(reactPkgPath, JSON.stringify(reactPkg, null, 2) + '\n');

          this.exec('cd react-wrappers && npm publish --access public');
          console.log('✅ @tmorrow/cre8-react published successfully\n');
        } catch (error) {
          console.log('❌ Failed to publish @tmorrow/cre8-react\n');
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
    help: args.includes('--help') || args.includes('-h')
  };

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