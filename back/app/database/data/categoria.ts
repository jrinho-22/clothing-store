import { ICategoriaDto } from "../../interface/categoriaDto";

export const categoriaData: ICategoriaDto[] =
    [
    {
        nome: "Pants",
        imgId: "pants-removebg-preview_v2wtgi"
    },
    {
        nome: "Outerwear", 
        imgId: "outwear-removebg-preview_picij5"
    },
    {
        nome: "T-shirts", 
        imgId: "shirt-removebg-preview_rhcaf2"
    },
    {
        nome: "Footwear",
        imgId: "footwear-removebg-preview_1_a7pr2y"
    },
    {
        nome: "Accessories",
        imgId: "hats-removebg-preview_dgnbzp"
    },
    {
        nome: "Women",
        imgId: "women2-removebg-preview_mrq4e4"
    },
    {
        nome: "Shorts",
        imgId: "shorts-removebg-preview_ghigdi"
    },
    {
        nome: "Underware",
        imgId: "underweare-removebg-preview_srwda0"
    },
    {
        nome: "Plain T-Shirt",
        parentCategory: "T-shirts"
    },
    {
        nome: "Plain T-Shirt",
        parentCategory: "T-shirts"
    },
    {
        nome: "Loose fit",
        parentCategory: "T-shirts"

    },
    {
        nome: "Jeans Pants",
        parentCategory: "Pants"
    },
    {
        nome: "Running Shorts",
        parentCategory: "Shorts"
    },
    {
        nome: "Jackets",
        parentCategory: "Outerwear"
    },
    {
        nome: "Socks",
        parentCategory: "Footwear"
    },
    {
        nome: "Shoes",
        parentCategory: "Footwear"
    },
    {
        nome: "Yoga Pants",
        parentCategory: "Pants"
    },
    {
        nome: "Dresses",
        parentCategory: "Women"
    },
    {
        nome: "Sweaters",
        parentCategory: "Outerwear"
    },
    {
        nome: "Hats",
        parentCategory: "Accessories"
    },
    {
        nome: "Bags",
        parentCategory: "Accessories"
    }
]

