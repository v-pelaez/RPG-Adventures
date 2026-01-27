# RPG-Adventures

Web platform for role-playing games that allows users to search for available campaigns or publish their own to find players.

## Description

RPG-Adventures is a Vue application developed as an academic project (2º DAW) that simulates a collaborative environment for the role-playing game community. Users can explore available campaigns, publish new adventures, and manage registrations.

## Features

### Internationalization
- Multi-language support with i18n
- Automatic browser language detection
- English as default language
- Language selector in the header

### Forms and Validation
- Registration form (PlayerFormComponent.vue) with validation through regular expressions
- Campaign publication form with dynamic fields
- Advanced validation using Vuelidate
- Modal Dialog for registrations

### Data Loading
- AJAX and JSON for asynchronous data loading
- Featured games carousel
- List of most popular systems

### Interactive Tables
- PrimeVue DataTable for campaign management
- Expandable rows
- Real-time filtering by keywords
- Column sorting

### Data Visualization
- Dynamic charts with Chart.js
- Bar, donut, and circular chart representations
- Automatic grouping of minor categories into "Others"

### Accessibility
- Responsive interface adapted for mobile and desktop devices
- Text descriptions for images and charts
- Scalable and accessible design

## Technology Stack

| Category | Technologies |
|----------|---------------|
| Framework | Vue 3 (Composition API) |
| Language | TypeScript |
| Build Tool | Vite |
| Components | PrimeVue, Chart.js |
| Styling | Tailwind CSS, PostCSS |
| Internationalization | Vue I18n |
| Routing | Vue Router |
| Data | JSON, AJAX |


## Configuration and Tools

- **tailwind.config.ts**: Tailwind CSS configuration
- **postcss.config.ts**: CSS transformation
- **tsconfig.json**: Strict typing
- **vite.config.ts**: Build optimizations


## Technical Notes

- Uses Vue 3 Composition API for modular logic
- **StadisticComposable** centralizes statistics calculation and translation logic
- Typing centralized in `types.ts` for JSON data consistency
- Native responsive design without sacrificing usability
- Components decomposed into independent modules to facilitate scalability and maintenance
