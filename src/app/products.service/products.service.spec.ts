import { HttpClientModule } from '@angular/common/http';
//import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from 'app/auth.service/auth.service';
import { of } from 'rxjs';

import { ProductsService } from '../products.service/products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpClientSpy: { get: jasmine.Spy };
  const authServicespy = jasmine.createSpyObj('AuthService ', ['getToken']);
 
  // }
 
  beforeEach(() => {
   
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductsService, { provide: AuthService, useValue:authServicespy}],
    });
   httpClientSpy = jasmine.createSpyObj('HttpClient', ['get' ]);
   authServicespy.getToken.and.returnValue('2')
   service = new ProductsService(httpClientSpy as any, authServicespy as any);
   //service = TestBed.inject(ProductsService)
  });

  it('should be created products', () => {
    expect(service).toBeTruthy();
  });
  it('deberia retornar los elementos con type desayuno', (done: DoneFn) =>{
    const mockResultDesayuno = 
       [
         {
           "id": 1,
           "name": "Café americano",
           "price": 5,
          
           "type": "desayuno",
           "dateEntry": ""
         },
         {
           "id": 2,
           "name": "Café con leche",
           "price": 7,
          
           "type": "desayuno",
           "dateEntry": ""
         }
         
       ]
     
    const typeDes = 'desayuno';
    httpClientSpy.get.and.returnValue(of(mockResultDesayuno));
    service.showProducts(typeDes)
    .subscribe({
      next: (result) => {
       
        expect(result).toEqual(mockResultDesayuno);
        done();
      }
    })
  });
  it('deberia retornar los elementos con type comida', (done: DoneFn) =>{
    const mockResultAlmuerzo= {
    "products" : [
      
       {
         "id": 5,
         "name": "Hamburguesa simple",
         "price": 10,
         "image": "https://i.pinimg.com/564x/81/88/85/818885be4d2370c78981d3e29d46a35e.jpg",
         "type": "comida",
         "dateEntry": ""
       },
       {
         "id": 6,
         "name": "Hamburguesa doble",
         "price": 15,
         "image": "https://i.pinimg.com/564x/db/b9/fd/dbb9fd2a99a0d5819fceed026906aa0c.jpg",
         "type": "comida",
         "dateEntry": ""
       }
       
     ]
    }
     
    const typeDes = 'comida';
    httpClientSpy.get.and.returnValue(of(mockResultAlmuerzo));
    service.showProducts(typeDes)
    .subscribe({
      next: (result) => {
        
        expect(result).toEqual(mockResultAlmuerzo);
        done();
      }
    })
  });
  it('deberia devolver el elemento con el id correspondiente', (done: DoneFn) =>{
    const mockResultId = {
      "id": 10,
      "name": "Agua 750ml",
      "price": 7,
      "image": "https://i.pinimg.com/564x/05/71/93/057193ba5fb82bbb423739d1325bd424.jpg",
      "type": "comida",
      "dateEntry": ""
    }
    let id = 10
    httpClientSpy.get.and.returnValue(of(mockResultId));
    service.getProduct(id)
    .subscribe({
      next: (result) => {
      
        expect(result).toEqual(mockResultId);
        done();
      }
    })
  });
  it('test que devuelve el objeto de la cuenta con la cantidad editada', ()=>{
    const itemData = {
      "id": 11,
      "name": "gaseosa 500ml",
      "price": 7,
      "image": "https://i.pinimg.com/564x/bb/03/5f/bb035f7ade151ed8df977081bf74f926.jpg",
      "type": "comida",
      "dateEntry": ""
    }
    const mockObjetoEditada = {
      "id": 11,
      "name": "gaseosa 500ml",
      "price": 7,
      "image": "https://i.pinimg.com/564x/bb/03/5f/bb035f7ade151ed8df977081bf74f926.jpg",
      "type": "comida",
      "dateEntry": "",
      "cant" : '2'
    }
    expect(service.elementosEditados(itemData, '2')).toEqual(mockObjetoEditada)
  });
  
  it('filtro obteniendo el objeto segun su ID', () =>{
    const itemData = [
      {
        "id": 5,
        "name": "Hamburguesa simple",
        "price": 10,
        "image": "https://i.pinimg.com/564x/81/88/85/818885be4d2370c78981d3e29d46a35e.jpg",
        "type": "comida",
        "dateEntry": ""
      },
      {
        "id": 6,
        "name": "Hamburguesa doble",
        "price": 15,
        "image": "https://i.pinimg.com/564x/db/b9/fd/dbb9fd2a99a0d5819fceed026906aa0c.jpg",
        "type": "comida",
        "dateEntry": ""
      }
    ]
    const dataResul =[{
      id: 6,
      name: "Hamburguesa doble",
      price: 15,
      image: "https://i.pinimg.com/564x/db/b9/fd/dbb9fd2a99a0d5819fceed026906aa0c.jpg",
      type: "comida",
      dateEntry: ""
  }] 

    expect(service.filter(itemData, 6)).toEqual(dataResul)
  });


  it('debe retornar un objto con los item diferentes al ID', ()=>{
    const itemData = [
      {
        "id": 5,
        "name": "Hamburguesa simple",
        "price": 10,
        "image": "https://i.pinimg.com/564x/81/88/85/818885be4d2370c78981d3e29d46a35e.jpg",
        "type": "comida",
        "dateEntry": ""
      },
      {
        "id": 6,
        "name": "Hamburguesa doble",
        "price": 15,
        "image": "https://i.pinimg.com/564x/db/b9/fd/dbb9fd2a99a0d5819fceed026906aa0c.jpg",
        "type": "comida",
        "dateEntry": ""
      },
      {
        "id": 7,
        "name": "Papas fritas",
        "price": 5,
        "image": "https://i.pinimg.com/564x/e6/64/54/e66454f6abd0144f45f40828cd024d5b.jpg",
        "type": "comida",
        "dateEntry": ""
      }
    ]
    const dataResul =[
      {
        "id": 6,
        "name": "Hamburguesa doble",
        "price": 15,
        "image": "https://i.pinimg.com/564x/db/b9/fd/dbb9fd2a99a0d5819fceed026906aa0c.jpg",
        "type": "comida",
        "dateEntry": ""
      },
      {
        "id": 7,
        "name": "Papas fritas",
        "price": 5,
        "image": "https://i.pinimg.com/564x/e6/64/54/e66454f6abd0144f45f40828cd024d5b.jpg",
        "type": "comida",
        "dateEntry": ""
      }
    ]
    expect(service.filter2(itemData, 5)).toEqual(dataResul)
  });

  it('crea un nuevo elemento para guardar el producto de la cuenta', ()=>{
    const ObjetItem =  {
      "id": 7,
      "name": "Papas fritas",
      "price": 5,
      "image": "https://i.pinimg.com/564x/e6/64/54/e66454f6abd0144f45f40828cd024d5b.jpg",
      "type": "comida",
      "dateEntry": ""
    }
    
    const mockResul = {
      "id" : '2',
       "pedido": [
        {
          "id": 7,
          "name": "Papas fritas",
          "price": 5,
          "image": "https://i.pinimg.com/564x/e6/64/54/e66454f6abd0144f45f40828cd024d5b.jpg",
          "type": "comida",
          "dateEntry": ""
        }
      ]
    }
    
    expect(service.objetoNew(ObjetItem)).toEqual(mockResul)
  });

  it('agregar un item a el objeto de los productos de la cuenta', ()=>{
    const ObjetItem = [ {
      "id": 7,
      "name": "Papas fritas",
      "price": 5,
      "image": "https://i.pinimg.com/564x/e6/64/54/e66454f6abd0144f45f40828cd024d5b.jpg",
      "type": "comida",
      "dateEntry": ""
    },
    {
      "id": 6,
      "name": "Hamburguesa doble",
      "price": 15,
      "image": "https://i.pinimg.com/564x/db/b9/fd/dbb9fd2a99a0d5819fceed026906aa0c.jpg",
      "type": "comida",
      "dateEntry": ""
    }]
    const itemNew = {
      "id": 5,
      "name": "Hamburguesa simple",
      "price": 10,
      "image": "https://i.pinimg.com/564x/81/88/85/818885be4d2370c78981d3e29d46a35e.jpg",
      "type": "comida",
      "dateEntry": ""
    }
    const mockResul = {
      "id" : '2',
      "pedido": [
       {
        "id": 5,
        "name": "Hamburguesa simple",
        "price": 10,
        "image": "https://i.pinimg.com/564x/81/88/85/818885be4d2370c78981d3e29d46a35e.jpg",
        "type": "comida",
        "dateEntry": ""
       },
       {
        "id": 7,
        "name": "Papas fritas",
        "price": 5,
        "image": "https://i.pinimg.com/564x/e6/64/54/e66454f6abd0144f45f40828cd024d5b.jpg",
        "type": "comida",
        "dateEntry": ""
      },
      {
        "id": 6,
        "name": "Hamburguesa doble",
        "price": 15,
        "image": "https://i.pinimg.com/564x/db/b9/fd/dbb9fd2a99a0d5819fceed026906aa0c.jpg",
        "type": "comida",
        "dateEntry": ""
      }
     ]
    }
    expect(service.agregarItem(itemNew, ObjetItem)).toEqual(mockResul)
  });

  it('elimina el item del objeto que tiene las ordenes', ()=>{
    const ObjetItemel =  [{
        
        "name": "Papas fritas",
        "price": 5,
        "image": "https://i.pinimg.com/564x/e6/64/54/e66454f6abd0144f45f40828cd024d5b.jpg",
        "type": "comida",
        "dateEntry": ""
    
    }]

    const mockResul2 = {
      "id" : '2',
      "pedido": 
      [{
       
        "name": "Papas fritas",
        "price": 5,
        "image": "https://i.pinimg.com/564x/e6/64/54/e66454f6abd0144f45f40828cd024d5b.jpg",
        "type": "comida",
        "dateEntry": ""
      }]
     
    }
    authServicespy.getToken.and.returnValue('2')
    console.log(service.eliminarItem(ObjetItemel))
    console.log(mockResul2)
    expect(service.eliminarItem([])).toEqual({
      "id" : '2',
      "pedido": 
      [
        
      
      ]
     
    })
  });

  it('esta funcion crea un objeto agregando la propiedad de cantidad', ()=>{
    const itemNew = {
      "id": 5,
      "name": "Hamburguesa simple",
      "price": 10,
      "image": "https://i.pinimg.com/564x/81/88/85/818885be4d2370c78981d3e29d46a35e.jpg",
      "type": "comida",
      "dateEntry": ""
    }

    const itemResult = {
      "id": 5,
      "name": "Hamburguesa simple",
      "price": 10,
      "image": "https://i.pinimg.com/564x/81/88/85/818885be4d2370c78981d3e29d46a35e.jpg",
      "type": "comida",
      "dateEntry": "",
      "cant" : 1
    }

    expect(service.crearObjeto(itemNew)).toEqual(itemResult)
  });
});