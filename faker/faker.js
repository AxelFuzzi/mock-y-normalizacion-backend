import { faker } from '@faker-js/faker';

    const generateProduct = ()=>{
        const product = {
            nombre: faker.commerce.productName(),
            precio: faker.datatype.number(),
            foto: faker.image.abstract()
        }
        console.log(product);
    }


const arrayProducts = ()=>{
    const products = []
        let cinco = 5
        for(let i = 0; i < cinco; i++){
            products.push(generateProduct());
        }
}

export default arrayProducts







    
