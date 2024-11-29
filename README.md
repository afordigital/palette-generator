# **Palette Generator**

_Effortlessly create stunning color palettes for your UX/UI projects._

![Desktop Image](https://i.imgur.com/omXHxoO.png)

---

## **Overview**

**Palette Generator** is a user-friendly tool built for designers to easily generate harmonious color palettes. Tailored for UX/UI professionals, this app simplifies the process of creating aesthetic designs with precision.

### **Features:**

- Generate beautiful color palettes instantly.
- Export palettes for direct use in your projects.
- Responsive design, optimized for mobile, tablet, and desktop.
- Built with modern technologies for a seamless user experience.

---

## **Technologies Used**

- **Frontend:** React, TailwindCSS, and Vite.
- **State Management:** Context API.
- **Utilities:** Chroma.js for color manipulation.
- **Hosting:** Vercel for deployment.

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/)

### **Installation**

Clone the repository and navigate to the project directory:

````bash
git clone https://github.com/afordigital/palette-generator.git
cd palette-generator

## Install the dependencies:

```bash
npm install
````

## Running the Application

Start the development server:

```bash
npm run dev
```

You should see output similar to this:

```bash
VITE v5.4.11  ready in 438 ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.44:5173/
➜  press h + enter to show help
```

Open your browser and navigate to the provided URL (http://localhost:5173/) to access the application.

## Contributing

We welcome contributions to enhance the Palette Generator. Follow these steps to get started:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```

````
3. Commit your changes:
```bash
git commit -m "Add feature-name"
``
4. Push to the branch:
```bash
git push origin feature-name
````

5. Create a Pull Request

## Recommended Extensions

For an improved development experience in Visual Studio Code, consider installing the following extensions:

- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [Simple React Snippets](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
- [Bracket Pair Color DLW](https://marketplace.visualstudio.com/items?itemName=BracketPairColorDLW.bracket-pair-color-dlw)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)
- [Auto Complete Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag)

## How to use ESLint to follow a code standard

```powershell
   pnpm run lint
```

You may observe some output like the following:

```powershell
   C:\Users\user\Desktop\palette-generator\src\components\shared\ui\chart.tsx
   70:8  error  '_' is defined but never used  @typescript-eslint/no-unused-vars

   C:\Users\user\Desktop\palette-generator\src\utils\ai-color-generator.ts
   72:5  warning  Unexpected console statement  no-console

   ✖ 2 problems (1 error, 1 warning)
```

You may encounter fewer or more errors and warnings, but you must resolve all errors in your code.
To fix them, you can try the following command:

```powershell
   pnpm run lint:resolve
```

The above command does not guarantee that all issues will be resolved automatically.
After running it, you should verify the results using:

If the errors are not resolved, you will need to fix them manually.

You can find the ESLint configuration in the `eslint.config.js` file.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).  
See the [LICENSE](./LICENSE) file for details.
