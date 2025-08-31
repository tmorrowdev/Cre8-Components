#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Automatic semantic versioning script
 * Analyzes git commits since last tag to determine version bump
 */

class VersionBumper {
  constructor() {
    this.packagePath = path.join(__dirname, '..', 'package.json');
    this.pkg = JSON.parse(fs.readFileSync(this.packagePath, 'utf8'));
  }

  /**
   * Execute git command and return output
   */
  git(command) {
    try {
      return execSync(`git ${command}`, { encoding: 'utf8' }).trim();
    } catch (error) {
      console.error(`Git command failed: ${command}`);
      return '';
    }
  }

  /**
   * Get the latest git tag
   */
  getLatestTag() {
    const tags = this.git('tag --sort=-version:refname');
    if (!tags) return null;
    return tags.split('\n')[0];
  }

  /**
   * Get commits since last tag or all commits if no tags exist
   */
  getCommitsSinceTag() {
    const latestTag = this.getLatestTag();
    const range = latestTag ? `${latestTag}..HEAD` : '';
    const commits = this.git(`log ${range} --oneline --no-merges`);
    return commits ? commits.split('\n') : [];
  }

  /**
   * Analyze commit messages for conventional commit patterns
   */
  analyzeCommits(commits) {
    let hasMajor = false;
    let hasMinor = false;
    let hasPatch = false;

    const conventionalPatterns = {
      // Breaking changes
      major: [
        /^(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?!:/,
        /BREAKING CHANGE:/i,
        /^breaking:/i
      ],
      // New features
      minor: [
        /^feat(\(.+\))?:/,
        /^add(\(.+\))?:/,
        /^implement(\(.+\))?:/
      ],
      // Bug fixes and patches
      patch: [
        /^fix(\(.+\))?:/,
        /^patch(\(.+\))?:/,
        /^hotfix(\(.+\))?:/,
        /^refactor(\(.+\))?:/,
        /^perf(\(.+\))?:/,
        /^style(\(.+\))?:/,
        /^docs(\(.+\))?:/,
        /^test(\(.+\))?:/,
        /^chore(\(.+\))?:/,
        /^update(\(.+\))?:/,
        /^bump(\(.+\))?:/
      ]
    };

    for (const commit of commits) {
      if (!commit.trim()) continue;

      // Check for major changes
      for (const pattern of conventionalPatterns.major) {
        if (pattern.test(commit)) {
          hasMajor = true;
          break;
        }
      }

      // Check for minor changes (only if no major found)
      if (!hasMajor) {
        for (const pattern of conventionalPatterns.minor) {
          if (pattern.test(commit)) {
            hasMinor = true;
            break;
          }
        }
      }

      // Check for patch changes
      for (const pattern of conventionalPatterns.patch) {
        if (pattern.test(commit)) {
          hasPatch = true;
          break;
        }
      }
    }

    // If no conventional commits found, default to patch for any changes
    if (!hasMajor && !hasMinor && !hasPatch && commits.length > 0) {
      hasPatch = true;
    }

    return { hasMajor, hasMinor, hasPatch };
  }

  /**
   * Calculate new version based on current version and changes
   */
  calculateNewVersion(currentVersion, { hasMajor, hasMinor, hasPatch }) {
    const [major, minor, patch] = currentVersion.split('.').map(Number);

    if (hasMajor) {
      return `${major + 1}.0.0`;
    } else if (hasMinor) {
      return `${major}.${minor + 1}.0`;
    } else if (hasPatch) {
      return `${major}.${minor}.${patch + 1}`;
    }

    return currentVersion; // No changes
  }

  /**
   * Update package.json with new version
   */
  updatePackageVersion(newVersion) {
    this.pkg.version = newVersion;
    fs.writeFileSync(this.packagePath, JSON.stringify(this.pkg, null, 2) + '\n');
  }

  /**
   * Main execution function
   */
  run(options = {}) {
    const { dryRun = false, tag = false } = options;

    console.log('🔍 Analyzing git history for version bump...\n');

    // Get current version
    const currentVersion = this.pkg.version;
    console.log(`📦 Current version: ${currentVersion}`);

    // Get latest tag
    const latestTag = this.getLatestTag();
    console.log(`🏷️  Latest tag: ${latestTag || 'none'}`);

    // Get commits since last tag
    const commits = this.getCommitsSinceTag();
    console.log(`📝 Commits since last tag: ${commits.length}`);

    if (commits.length === 0) {
      console.log('✨ No new commits found. Version remains unchanged.');
      return currentVersion;
    }

    // Show recent commits
    console.log('\n📋 Recent commits:');
    commits.slice(0, 5).forEach(commit => {
      console.log(`   • ${commit}`);
    });
    if (commits.length > 5) {
      console.log(`   ... and ${commits.length - 5} more`);
    }

    // Analyze commits
    const analysis = this.analyzeCommits(commits);
    console.log('\n🔬 Analysis:');
    console.log(`   Breaking changes: ${analysis.hasMajor ? '✅' : '❌'}`);
    console.log(`   New features: ${analysis.hasMinor ? '✅' : '❌'}`);
    console.log(`   Bug fixes/patches: ${analysis.hasPatch ? '✅' : '❌'}`);

    // Calculate new version
    const newVersion = this.calculateNewVersion(currentVersion, analysis);

    if (newVersion === currentVersion) {
      console.log('\n✨ No version bump needed.');
      return currentVersion;
    }

    console.log(`\n🚀 Version bump: ${currentVersion} → ${newVersion}`);

    if (dryRun) {
      console.log('🔍 Dry run - no changes made');
      return newVersion;
    }

    // Update package.json
    this.updatePackageVersion(newVersion);
    console.log('✅ Updated package.json');

    // Create git tag if requested
    if (tag) {
      try {
        this.git(`tag v${newVersion}`);
        console.log(`🏷️  Created tag: v${newVersion}`);
      } catch (error) {
        console.error('❌ Failed to create git tag:', error.message);
      }
    }

    console.log(`\n🎉 Version successfully bumped to ${newVersion}`);
    return newVersion;
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes('--dry-run') || args.includes('-d'),
    tag: args.includes('--tag') || args.includes('-t'),
    help: args.includes('--help') || args.includes('-h')
  };

  if (options.help) {
    console.log(`
🔧 Automatic Semantic Versioning Script

Usage: node scripts/version-bump.js [options]

Options:
  -d, --dry-run    Show what would be done without making changes
  -t, --tag        Create a git tag after version bump
  -h, --help       Show this help message

Examples:
  node scripts/version-bump.js --dry-run    # Preview version bump
  node scripts/version-bump.js --tag        # Bump version and create tag
  npm run version:bump                      # Run via npm script

Conventional Commit Patterns:
  Major (breaking):  feat!:, fix!:, BREAKING CHANGE:
  Minor (feature):   feat:, add:, implement:
  Patch (fix):       fix:, patch:, refactor:, perf:, etc.
`);
    process.exit(0);
  }

  const bumper = new VersionBumper();
  try {
    bumper.run(options);
  } catch (error) {
    console.error('❌ Version bump failed:', error.message);
    process.exit(1);
  }
}

module.exports = VersionBumper;