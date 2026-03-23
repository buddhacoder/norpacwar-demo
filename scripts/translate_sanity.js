const { createClient } = require('@sanity/client');
const translate = require('google-translate-api-x');

// Use the existing environment variables or the known keys
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 's7rzjtw7';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = 'skOaeFMOAotHsKKrvqHaXN8IJBGNLPmbpzkzGFr7FRleSOTTswAb1F35AFij1HNbz5x67aahQG834YyeNWxzYDOrPDqqPjuOQ8HdfnvYfC1vnCncPfpLKJK6hPjLyH1dZ8QXGPipqqhcUbLfcIYg94VJooikVI65JQ2LN24m4w1ZJ2iMqcK6';

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Sleep helper to avoid hammering free endpoints
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runTranslation() {
  console.log('Fetching documents without content_ru...');
  
  // We fetch those that need translation
  const query = `*[_type == "diary" && !defined(content_ru)][0...100]`;
  const docs = await client.fetch(query);
  
  console.log(`Found ${docs.length} documents to translate.`);

  for (const doc of docs) {
    if (!doc.title_en && !doc.content_en) continue;
    
    console.log(`Translating: ${doc.title_en || doc._id}`);
    
    try {
      const patches = {};

      if (doc.title_en && !doc.title_ru) {
        const titleRes = await translate(doc.title_en, { to: 'ru', autoCorrect: true });
        patches.title_ru = titleRes.text;
      }

      if (doc.content_en) {
        // chunk extremely long HTML manually if necessary, but try it in one go first 
        // google-translate-api-x is usually robust, but has character limits.
        if (doc.content_en.length < 5000) {
           const contentRes = await translate(doc.content_en, { to: 'ru', autoCorrect: true });
           patches.content_ru = contentRes.text;
        } else {
           console.log('  Content too long for robust free API, skipping massive body for now.');
           // We could chunk it, but skip if massive for this demo
        }
      }

      if (Object.keys(patches).length > 0) {
        await client.patch(doc._id).set(patches).commit();
        console.log(`✔️ Patched ${doc._id}`);
      }
      
      await sleep(1500); // polite pause
    } catch (err) {
      console.error(`Failed to translate ${doc._id}: ${err.message}`);
    }
  }

  console.log('Done translating Sanity content.');
}

runTranslation().catch(console.error);
