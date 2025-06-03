// Remap code-based token keys to semantic names using Figma variable collections
// 1. Load all Figma variable collections and build a codeID-to-semantic-name map
// 2. For each token in starbucks.tokens.json, replace the key with the semantic name if found
// 3. Output the remapped JSON

const fs = require('fs');
const path = require('path');

// Load Figma variable collections
const collections = [
  'starbucks-docs/Equity-Semantic Tokens.json',
  'starbucks-docs/Equity-Global Tokens.json',
  'starbucks-docs/Equity-Component Tokens.json',
  'starbucks-docs/Typography.json',
].map(f => JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8')));

// Build codeID-to-semantic-name map
const codeToSemantic = {};
for (const collection of collections) {
  if (Array.isArray(collection.variables)) {
    for (const v of collection.variables) {
      if (v.id && v.name) codeToSemantic[v.id.replace('VariableID:', '')] = v.name;
    }
  }
}

// Build a value+type to semantic name map for fallback matching
const valueTypeToSemantic = {};
for (const collection of collections) {
  if (Array.isArray(collection.variables)) {
    for (const v of collection.variables) {
      // Only map if resolvedValuesByMode exists
      if (v.resolvedValuesByMode) {
        for (const mode of Object.values(v.resolvedValuesByMode)) {
          if (mode && mode.resolvedValue !== undefined) {
            let val = mode.resolvedValue;
            // Convert color objects to hex if needed
            if (typeof val === 'object' && val.r !== undefined) {
              // Convert RGBA to hex
              const r = Math.round(val.r * 255);
              const g = Math.round(val.g * 255);
              const b = Math.round(val.b * 255);
              const a = val.a !== undefined ? val.a : 1;
              val = a === 1 ? `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}` : `rgba(${r}, ${g}, ${b}, ${a})`;
            }
            const key = `${val}|${v.type}`;
            valueTypeToSemantic[key] = v.name;
          }
        }
      }
    }
  }
}

function findSemanticName(codeKey) {
  // Try to match by code ID (e.g., fill-hgcx9l => hgcx9l)
  const idPart = codeKey.split('-').pop();
  for (const [codeId, name] of Object.entries(codeToSemantic)) {
    if (codeId.endsWith(idPart)) return name;
  }
  return null;
}

function findSemanticNameByValueAndType(token) {
  if (!token || !token.value || !token.type) return null;
  let val = token.value;
  if (typeof val === 'string' && val.startsWith('#')) val = val.toUpperCase();
  const key = `${val}|${token.type.toUpperCase()}`;
  return valueTypeToSemantic[key] || null;
}

// Load starbucks.tokens.json
const tokensPath = path.join(__dirname, 'starbucks.tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

function remapTokenKeys(obj, parentKey) {
  // If this is a leaf object (e.g., colors, typography), remap its keys
  if (Object.keys(obj).length && typeof Object.values(obj)[0] === 'object' && !Array.isArray(Object.values(obj)[0])) {
    const leafRemapped = {};
    for (const [k, v] of Object.entries(obj)) {
      let semantic = findSemanticName(k);
      if (!semantic) semantic = findSemanticNameByValueAndType(v);
      if (semantic) {
        // If semantic name already exists, merge or overwrite
        leafRemapped[semantic] = v;
      } else {
        leafRemapped[k] = v;
      }
    }
    return leafRemapped;
  }
  // Otherwise, recursively remap nested objects
  const remapped = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && !Array.isArray(value)) {
      remapped[key] = remapTokenKeys(value, key);
    } else {
      remapped[key] = value;
    }
  }
  return remapped;
}

const remappedTokens = {};
for (const [section, sectionObj] of Object.entries(tokens)) {
  remappedTokens[section] = remapTokenKeys(sectionObj);
}

// Write remapped tokens to a new file
fs.writeFileSync(path.join(__dirname, 'starbucks.tokens.semantic.json'), JSON.stringify(remappedTokens, null, 2));
console.log('Remapped tokens written to starbucks.tokens.semantic.json');
