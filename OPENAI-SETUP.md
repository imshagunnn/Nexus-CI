# How to Add Your OpenAI API Key (Simple Guide)

You only need to do this **once**. Takes about 3 minutes.

## Step 1: Get a free API key

1. Go to **https://platform.openai.com/signup** and create an account (or log in).
2. Go to **https://platform.openai.com/api-keys**
3. Click **"Create new secret key"**
4. Copy the key — it looks like: `sk-proj-abc123...`
   - **Important:** Copy it now. You won't see it again!

> OpenAI gives new accounts a small free credit. You only pay if you use more than that.

## Step 2: Paste the key in your project

1. Open this file in your project folder:
   ```
   .env.local
   ```
2. Find this line:
   ```
   OPENAI_API_KEY=
   ```
3. Paste your key **right after the `=`** with no spaces:
   ```
   OPENAI_API_KEY=sk-proj-your-actual-key-here
   ```
4. Save the file.

## Step 3: Restart the app

In your terminal:

1. Press **Ctrl + C** to stop the server
2. Run again:
   ```
   npm run dev
   ```
3. Open **http://localhost:3000** and run a new analysis

## How to know it's working

- On the dashboard, you should **NOT** see the yellow **"Demo Data"** badge
- Competitor names and founder advice should match **your specific product idea**

## Safety tips

- **Never** share your API key or post it on GitHub
- The `.env.local` file is already hidden from git — your key stays private
- If your key leaks, delete it at https://platform.openai.com/api-keys and make a new one

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Still shows "Demo Data" | Restart `npm run dev` after saving `.env.local` |
| "Invalid API key" | Check you copied the full key with no extra spaces |
| Analysis is slow | Normal — AI takes 10–20 seconds |
| No money on account | Add billing at https://platform.openai.com/settings/organization/billing |
