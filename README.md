# Jargon Buster

## Purpose

This is a simple search app that allows new and existing employees to quickly search for terms, definitions, and
acronyms for commonly used phrases within Consulting or Corporate workplaces.

The idea is to have a quick and accessible means for people to search for concepts without having to ask that dreaded '
silly question' in a meeting.

## How It's Built

- **Tools**
  - React
  - TypeScript
  - NextJS
  - Zod
  - ShadCN UI
  - Tailwind CSS
  - Vercel
- **Data Sources**
  - Sanity CMS
  - Excel Spreadsheet

### How It's Configured

- Inside `env.example` you can swap the Data Source being pulled into the app.
- Swap the values for `NEXT_PUBLIC_ENVIRONMENT` depending on what data source you want to use.

### How To Use It

**Inside jargon-buster directory**

- Run `npm run dev`
- Build `npm run build`
- Lint `npm run lint`

**Inside `jargon-buster\sanity` directory**

- Run `npm run dev`
- Build `npm run build`
- Deploy `npm run deploy`
