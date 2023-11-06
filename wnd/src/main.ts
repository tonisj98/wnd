import "./assets/styles.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import { createI18n } from "vue-i18n";

import "primeicons/primeicons.css"; 
import "primevue/resources/themes/lara-light-teal/theme.css";
import App from "./App.vue";
import router from "./router";
import Button from "primevue/button";
import "primevue/resources/primevue.min.css";
import Sidebar from "primevue/sidebar";
import Menu from "primevue/menu";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Badge from "primevue/badge";
import Tooltip from 'primevue/tooltip';
import OverlayPanel from 'primevue/overlaypanel';
import  StripeCheckout  from '@vue-stripe/vue-stripe';
import ConfirmDialog from 'primevue/confirmdialog';

import Dialog from 'primevue/dialog';

import Dropdown from 'primevue/dropdown';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';  
import Row from 'primevue/row';                 

import Steps from 'primevue/steps';

import InputText from 'primevue/inputtext';


import BadgeDirective from "primevue/badgedirective";
import ConfirmationService from 'primevue/confirmationservice';



const app = createApp(App);
app.directive("badge", BadgeDirective);
app.component("StripeCheckout", StripeCheckout);
app.component("Dialog", Dialog);
app.component("Steps", Steps);
app.component("Button", Button);
app.component("Sidebar", Sidebar);
app.component("Menu", Menu);
app.component("Dropdown", Dropdown);
app.component("ConfirmDialog", ConfirmDialog);
app.component("Toast", Toast);
app.component("Badge", Badge);
app.component("OverlayPanel", OverlayPanel);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("InputText", InputText);
app.directive('tooltip', Tooltip);

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);

const i18n = createI18n({
  locale: "es",
  messages: {
    en: {

      greeting: "Hello, world!",
      bestSellers: "Best Sellers",
      allFilters: "All Filters",
      searchByName: "Search by name...",
      allProducts: "All Products",
      filter: "Filters",
      price: "Price",
      rating: "Rating",
      addToCart: "Add to Cart",
      description: "Description",
      stock: "Stock:",
      shoppingCart: "Shopping Cart",
      items: "Item(s)",
      productDetails: "Product Details",
      quantity: "Quantity",
      total: "Total",
      orderSummary: "Order Summary",
      shippment: "Shipment",
      promoCode: "Promo Code",
      apply: "Apply",
      totalCost: "Total Cost",
      checkout: "Checkout",
      allCategories: "All Categories",
      ascending: "Ascending",
      descending: "Descending",
      back: "Back",
      availables: "available",
      remove: "Remove",
      enterCode: "Enter discount code",
      standardShipping: "Standard Shipping",
      shipping: "Shipping",
      wnd: 'Valid code. You have received a 10% discount',
      seller: 'Seller',
      loading: 'Loading...',
      error404: 'Error 404',
    pageNotFound: 'Page Not Found',
    mainPage: 'Go back to the main page',
    cartProducts: 'Shopping Cart',
    emptyCart: 'Cart is empty.',
    buy:'Buy',
    productAddedSummary: "Product Added",
    productAddedDetail: "Added {product} to the shopping cart",
    brand: "Brand",
    category:"Category",
    footerTop: "© This is a Sample Page for the WND selection process ",
    footerBot: "Antonio Serrano Jimenez - antonio.serjime@gmail.com",
    en: "Invalid promotion code",
    deleteAllMessageConfirmation: "Are you sure you want to delete your entire shopping cart?",
    confirm: "Confirm",
    cancel: "Cancel",
    resetFilters: "Reset Filters",
    promotionMessage: "🎉 Congrats! Get 10% off for Christmas with code 'WND'. 🛍️🎅🎁",
    successfulPurchase: "Purchase completed",
    priceRate:"Price range",
    favorites: "Favorites",
    noProducts: "We're sorry, there are currently no products to display.",
    administratorPanel:"Admin Panel",
    welcome:"Welcome"

    },
    es: {

      greeting: "¡Hola, mundo!",
      bestSellers: "Más Vendidos",
      allFilters: "Todos los filtros",
      searchByName: "Buscar por nombre...",
      allProducts: "Todos los productos",
      filter: "Filtros",
      price: "Precio",
      rating: "Puntuación",
      addToCart: "Añadir al carrito",
      description: "Descripcion",
      stock: "Unidades:",
      shoppingCart: "Cesta",
      items: "Objeto(s)",
      productDetails: "Detalles del producto",
      quantity: "Cantidad",
      total: "Total",
      orderSummary: "Resumen de la compra",
      shippment: "Envío",
      promoCode: "Código de Promoción",
      apply: "Aplicar",
      totalCost: "Coste total",
      checkout: "Proceder al pago",
      allCategories: "Todas las categorías",
      ascending: "Ascendente",
      descending: "Descendente",
      back: "Atrás",
      availables: "disponible(s)",
      remove: "Eliminar",
      enterCode: "Introduce el código de descuento",
      standardShipping: "Envío estándar",
      shipping: "Envío",
       wnd: 'Código válido. Has obtenido un 10% de descuento',
       seller: 'Vendedor',
       loading: 'Cargando...',
       error404: 'Error 404',
    pageNotFound: 'Página no encontrada',
    mainPage: 'Volver a la página de inicio',
    cartProducts: 'Productos en el carrito',
    emptyCart: 'El carrito está vacío.',
    buy:'Comprar',
    productAddedSummary: "Producto Añadido",
    productAddedDetail: "Se ha añadido {product} a la cesta de la compra",
    brand: "Marca",
    category: "Categoría",
    footerTop: "© Esta es una página de muestra para el proceso de selección de WND ",
    footerBot:"Antonio Serrano Jimenez - antonio.serjime@gmail.com",
    notwnd: "Código de promoción no válido",
    deleteAllMessageConfirmation: "¿Estás seguro que quieres eliminar toda la cesta de la compra?",
    confirm: "Confimar",
    cancel: "Cancelar",
    resetFilters: "Borrar Filtros",
    promotionMessage: "🎉 ¡Felicidades! Obtén un 10% de descuento para Navidad con el código 'WND'. 🛍️🎅🎁",
    successfulPurchase: "Compra completada",
    priceRate:"Rango de precio",
    favorites: "Favoritos",
    noProducts: "Lo sentimos, actualmente no hay productos para mostrar.",
    administratorPanel:"Panel de Administrador",
    welcome:"Bienvenido"
  
    },
    de: {
     
      greeting: "Hallo, Welt!",
      bestSellers: "Bestseller",
      allFilters: "Alle Filter",
      searchByName: "Suchen nach Namen...",
      allProducts: "Alle Produkte",
      filter: "Filter",
      price: "Preis",
      rating: "Bewertung",
      addToCart: "In den Warenkorb legen",
      description: "Beschreibung",
      stock: "Bestand:",
      shoppingCart: "Einkaufswagen",
      items: "Artikel",
      productDetails: "Produktdetails",
      quantity: "Menge",
      total: "Gesamt",
      orderSummary: "Bestellübersicht",
      shippment: "Versand",
      promoCode: "Promotion-Code",
      apply: "Anwenden",
      totalCost: "Gesamtkosten",
      checkout: "Kasse",
      allCategories: "Alle Kategorien",
      ascending: "Aufsteigend",
      descending: "Absteigend",
      back: "Zurück",
      availables: "verfügbar(e)",
      remove: "Entfernen",
      enterCode: "Geben Sie den Rabattcode ein",
      standardShipping: "Standardversand",
      shipping: "Versand",
      wnd: 'Gültiger Code. Sie haben einen Rabatt von 10% erhalten',
      seller: 'Verkäufer',
      loading:'Aufladen',
      error404: 'Fehler 404',
    pageNotFound: 'Seite nicht gefunden',
    mainPage: 'Zurück zur Hauptseite', 
    cartProducts: 'Produkte im Warenkorb',
    emptyCart: 'Der Warenkorb ist leer.',
    buy:'Kaufen',
    productAddedSummary: "Produkt hinzugefügt",
    productAddedDetail: "{product} wurde dem Warenkorb hinzugefügt",
    brand: "Marke",
    category: "Kategorie",
    footerTop: "© Dies ist eine Beispielseite für den WND-Auswahlprozess ",
    footerBot: "Antonio Serrano Jimenez - antonio.serjime@gmail.com",
    notwnd: "Ungültiger Aktionscode",
    deleteAllMessageConfirmation: "Sind Sie sicher, dass Sie Ihren gesamten Warenkorb löschen möchten?",
    confirm: "Bestätigen",
    cancel: "Abbrechen",
    resetFilters: "Filter zurücksetzen",
    promotionMessage: "🎉 Herzlichen Glückwunsch! Holen Sie sich 10 % Rabatt zu Weihnachten mit dem Code 'WND'. 🛍️🎅🎁",
    successfulPurchase: "Kauf abgeschlossen",
    priceRate:"Preisspanne",
    favorites: "Favoriten",
    noProducts: "Es tut uns leid, derzeit gibt es keine Produkte zur Anzeige.",
    administratorPanel:"Administrationspanel",
    welcome:"Willkommen"
   
    },
    fr: {
      greeting: "Bonjour le monde!",
      bestSellers: "Meilleures ventes",
      allFilters: "Tous les filtres",
      searchByName: "Rechercher par nom...",
      allProducts: "Tous les produits",
      filter: "Filtres",
      price: "Prix",
      rating: "Évaluation",
      addToCart: "Ajouter au panier",
      description: "Description",
      stock: "En stock:",
      shoppingCart: "Panier",
      items: "Article(s)",
      productDetails: "Détails du produit",
      quantity: "Quantité",
      total: "Total",
      orderSummary: "Résumé de la commande",
      shippment: "Expédition",
      promoCode: "Code promotionnel",
      apply: "Appliquer",
      totalCost: "Coût total",
      checkout: "Passer à la caisse",
      allCategories: "Toutes les catégories",
      ascending: "Ascendant",
      descending: "Descendant",
      back: "Retour",
      availables: "disponible(s)",
      remove: "Supprimer",
      enterCode: "Entrez le code de réduction",
      standardShipping: "Livraison standard",
      shipping: "Expédition",
      wnd: 'Code valide. Vous avez obtenu une réduction de 10%',
      seller: 'Vendeur',
      loading: 'Mise en charge...',
      error404: 'Erreur 404',
      pageNotFound: 'Page non trouvée',
      mainPage: 'Retour à la page principale',
      cartProducts: 'Produits dans le panier',
      emptyCart: 'Le panier est vide.',
      buy:'Acheter',
      productAddedSummary: "Produit ajouté",
      productAddedDetail: "Ajouté {product} au panier",
      brand: "Marque",
      category: "Catégorie",
      footerTop: "© Il s'agit d'une page d'exemple pour le processus de sélection de WND ",
      footerBot: "Antonio Serrano Jimenez - antonio.serjime@gmail.com",
      notwnd: "Code de promotion non valide",
      deleteAllMessageConfirmation: "Êtes-vous sûr de vouloir supprimer l'intégralité de votre panier d'achat ?",
      confirm: "Confirmer",
    cancel: "Annuler",
    resetFilters: "Réinitialiser les filtres",
    promotionMessage: "🎉 Félicitations ! Obtenez 10 % de réduction pour Noël avec le code 'WND'. 🛍️🎅🎁",
    successfulPurchase: "Achat terminé",
    priceRate:"Plage de prix",
    favorites: "Favoris",
    noProducts: "Désolé, il n'y a actuellement aucun produit à afficher.",
    administratorPanel:"Panneau d'administration",
    welcome:"Bienvenue"
    },
   
  },
});

app.use(i18n).mount("#app");
