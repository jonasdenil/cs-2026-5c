# Sanity CMS Setup Guide

## Setup Instructions

### 1. Create a Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Create a new project (choose "Single dataset")
3. Choose "Production" as your dataset name
4. Copy your **Project ID** and **API Token**

### 2. Add Environment Variables

Add these variables to your project settings (or `.env.local` for local development):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

### 3. Seed Initial Data

1. Start your dev server: `npm run dev`
2. Go to `http://localhost:3000/seed`
3. Click "Seed Data" button to populate Sanity with Charlotte's skills and cases

### 4. Access Sanity Studio

- Go to `http://localhost:3000/studio`
- You'll see the Sanity CMS interface

## What You Can Manage

### Creative Skills
- **Title**: The skill name (e.g., "Brand Design")
- **Description**: What Charlotte does with this skill
- **Desktop Position**: Where the skill appears on the "Who" section image (top/left percentages, rotation)
- **Order**: Drag to reorder skills

### Cases
Each case has two main parts:

#### Preview Data (what shows in the grid)
- **Title**: Project name
- **Image**: Thumbnail for the case
- **Filename Preview**: The preview filename (e.g., "sustainable-future-preview")
- **Intro**: Short description (optional)
- **Collaboration**: Credit partners (optional)
- **Order**: Drag to reorder cases

#### Detail Page (coming soon)
- Will be a page builder with text and image blocks
- Charlotte will be able to customize each case's detail page

## Features

- 🎨 Manage skills with custom desktop positioning
- 📸 Upload case images directly
- 🔄 Drag & drop to reorder
- 📱 Mobile-responsive skill display (positions only on desktop)
- 🌐 Live updates on the website

## Troubleshooting

**Can't access Studio?**
- Check that `SANITY_API_TOKEN` is set correctly
- Make sure the token has appropriate permissions in Sanity

**Images not showing?**
- Make sure images are uploaded through the Sanity interface
- Images must be selected from the Sanity image library

**Changes not reflecting?**
- Hard refresh the website (Cmd+Shift+R or Ctrl+Shift+R)
- The website fetches fresh data on page load
