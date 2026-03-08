# Supermarket CMS Admin Panel

Admin panel for editing **operational and frequently updated content only**. Layout, images, and design are fixed on the main site.

## Setup

1. **MongoDB**  
   Ensure MongoDB is running (local or Atlas). Create a `.env` or `.env.local` file (copy from `.env.example`):

   ```env
   MONGODB_URI=mongodb://localhost:27017
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=yourpassword
   JWT_SECRET=your-secret-key-change-in-production
   ```

2. **Install and run**

   ```bash
   npm install
   npm run dev
   ```

3. **First login**  
   Open `http://localhost:3000` — you will be redirected to `/login`. Sign in with `ADMIN_USERNAME` and `ADMIN_PASSWORD` from `.env`. On first login you will be asked to **set a new password**; it is stored in the database and the `.env` password is no longer used. You can remove `ADMIN_PASSWORD` from `.env` after that.

4. **Seed (optional)**  
   While logged in, open `http://localhost:3000/api/seed` once to load default content (hero, stores, brands, newsletter, forms, SEO). Safe to call multiple times; only empty collections are filled.

## Editable via Admin

| Section        | What you can edit                                      |
|----------------|--------------------------------------------------------|
| **Hero**       | Tagline, headline, subtitle, CTA text, insight quote    |
| **Stores**     | Store names and order (Trusted By)                     |
| **Brands**     | Brand names and order (Our Core Range)                 |
| **Products**   | Add / edit / remove products, names, descriptions     |
| **Leadership** | Names, titles, short messages                          |
| **Careers**    | Job listings (title, location, type, description)     |
| **Newsletter** | Heading, subheading, button text, success message      |
| **Forms**      | Form title, intro text, confirmation message, button  |
| **SEO**        | Page title and meta description per page               |

## Fixed (not editable here)

- All images and image galleries  
- “What We Do” section content  
- Page layouts and section structure  
- Image placement, sizing, styling  
- Global typography, color palette, spacing  
- Core page templates (Home, About, Products, Contact)

## Tech

- Next.js 16 (App Router)
- MongoDB
- TypeScript
