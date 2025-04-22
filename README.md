# ACIDS - Next.js website

New website for ACIDS collective using the Next.js framework.

### Deployment

Create a next.js app and install dependencies

```shell
npx create-next-app@latest
npm --force i framer-motion
```

Set the next.js output to dump static files in the `next.config.js` file

```javascript
const nextConfig = {
  output: 'export',
  ...
}
```
