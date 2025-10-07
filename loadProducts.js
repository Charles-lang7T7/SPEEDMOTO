// loadProducts.js - Shared products loader for all pages
const loadProducts = () => {
  return new Promise((resolve, reject) => {
    // Check if products are already in localStorage
    const existingProducts = localStorage.getItem("productsData");
    if (existingProducts) {
      console.log("✅ Products already loaded from localStorage");
      resolve(JSON.parse(existingProducts));
      return;
    }

    // If not in localStorage, use the hardcoded products array
    const hardcodedProducts = [
      {
        id: 1,
        name: "Ducati Corse D-air® K3",
        price: 699,
        image: "/SPEEDMOTO/39-Dair-K3-b-1920x1536.png",
      },
      {
        id: 2,
        name: "Ducati Corse D-air® C3",
        price: 549,
        image: "/SPEEDMOTO/40-Dair-C3.-b-1920x1536.png",
      },
      {
        id: 3,
        name: "Ducati Corse D-air® C3 Lady",
        price: 549,
        image: "/SPEEDMOTO/41-Dair-C3-lady-b-1920x1536.png",
      },
      {
        id: 4,
        name: "Ducati Corse C6",
        price: 800,
        image: "/SPEEDMOTO/2023-C6-Corse-b-1920x1536.png",
      },
      {
        id: 5,
        name: "Ducati Corse C5 Lady",
        price: 499,
        image: "/SPEEDMOTO/2023-C52PC-Lady-b-1920x1536.png",
      },
      {
        id: 6,
        name: "Ducati Corse C5",
        price: 499,
        image: "/SPEEDMOTO/2023-C52PC-Man-b-1920x1536.png",
      },
      {
        id: 7,
        name: "Ducati Corse K3",
        price: 999,
        image: "/SPEEDMOTO/Ducati-Corse-K3-b-1920x1536.png",
      },
    ];

    // Store in localStorage
    localStorage.setItem("productsData", JSON.stringify(hardcodedProducts));
    console.log(
      "✅ Products loaded from hardcoded data:",
      hardcodedProducts.length,
      "items"
    );
    resolve(hardcodedProducts);
  });
};

export default loadProducts;


