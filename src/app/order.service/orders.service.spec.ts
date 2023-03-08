import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from 'app/auth.service/auth.service';
import { ProductsService } from 'app/products.service/products.service';
import * as moment from 'moment';
import { of } from 'rxjs';

import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpClientSpy: { get: jasmine.Spy,
    post: jasmine.Spy,
    put: jasmine.Spy};
  const authServicespy = jasmine.createSpyObj('AuthService ', ['getToken']);
  const productServiceSpy = jasmine.createSpyObj('ProductService', ['getCliente']);
  const objetoEditarSpy = jasmine.createSpyObj('OrdersService', [' objetoStatus']);

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers:[OrdersService ,{ provide: AuthService, useValue:authServicespy}, { provide: ProductsService, useValue: productServiceSpy}]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get' , 'post', 'put']);
    authServicespy.getToken.and.returnValue('2')
     service = new OrdersService(httpClientSpy as any, authServicespy as any, productServiceSpy as any);
    //service = TestBed.inject(OrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('objeto usado en la API', ()=>{
    const mockresponse1 = {
      id: '5',
      userId: '2',
      client: 'camila',
      products: [],
      status: 'pending',
      dateEntry: '2023-03-01 12:00 pm',
      dateProcessed: '2023-03-01 12:00 pm',
   }
   const mockresponse = {
    id: '5',
    userId: '2',
    client: 'camila',
    products: [],
    status: 'canceled',
    dateEntry: '2023-03-01 12:00 pm',
    dateProcessed: moment().format('YYYY-MM-DD hh:mm a'),
   }

   expect(service.objetoStatus(mockresponse1, 'canceled')).toEqual(mockresponse)
  });
  
  it('deberia retornar los elementos con type pending', (done: DoneFn) =>{
    const mockResultPending = [
      {
        "userId": "2",
        "client": "camila",
        "products": [
          {
            "product": "Café americano",
            "qty": 1
          },
          {
            "product": "Sandwich de jamón y queso",
            "qty": 1
          },
          {
            "product": "Jugo de frutas",
            "qty": 1
          }
        ],
        "status": "pending",
        "dateEntry": "2023-02-22 06:13:26",
        "dateProcessed": "2023-02-27 01:13:23",
        "id": 1
      },
      {
        "userId": "2",
        "client": "camila",
        "products": [
          {
            "product": "Café americano",
            "qty": 1
          },
          {
            "product": "Sandwich de jamón y queso",
            "qty": 1
          },
          {
            "product": "Jugo de frutas",
            "qty": 1
          }
        ],
        "status": "pending",
        "dateEntry": "2023-02-22 06:13:43",
        "dateProcessed": "2023-02-22 06:13:43",
        "id": 2
      }
    ]

    httpClientSpy.get.and.returnValue(of(mockResultPending));
    service.getAllOrder('pending')
    .subscribe({
      next: (result) => {
        
        expect(result).toEqual(mockResultPending);
        done();
      }
    })
  });

  it('permite crear una peticion post a productos', (done:DoneFn)=>{
    const mockResultDone = {
      "userId": "2",
      "client": "camila",
      "products": [
        {
          "product": "Café con leche",
          "qty": 1
        },
        {
          "product": "Café americano",
          "qty": 1
        },
        {
          "product": "Sandwich de jamón y queso",
          "qty": 1
        },
        {
          "product": "Jugo de frutas",
          "qty": 1
        }
      ],
      "status": "canceled",
      "dateEntry": "2023-02-22 06:14:33",
      "dateProcessed": "2023-02-22 06:14:33",
      "id": 3
    }
    const mockResDone = {
      "userId": "2",
      "client": "camila",
      "products": [
        {
          "product": "Café con leche",
          "qty": 1
        },
        {
          "product": "Café americano",
          "qty": 1
        },
        {
          "product": "Sandwich de jamón y queso",
          "qty": 1
        },
        {
          "product": "Jugo de frutas",
          "qty": 1
        }
      ],
      "status": "canceled",
      "dateEntry": "2023-02-22 06:14:33",
      "dateProcessed": "2023-02-22 06:14:33",
     
    }

    httpClientSpy.post.and.returnValue(of(mockResultDone));
    service.getOrderItem(mockResDone)
    .subscribe({
      next: (result) => {
        
        expect(result).toEqual(mockResultDone);
        done();
      }
    })
  });

  it('recibe los productos de la API de despliegue', (done: DoneFn)=>{
    const mockResultPending = { "orders" :[
      {
        "userId": "2",
        "client": "camila",
        "products": [
          {
            "product": "Café americano",
            "qty": 1
          },
          {
            "product": "Sandwich de jamón y queso",
            "qty": 1
          },
          {
            "product": "Jugo de frutas",
            "qty": 1
          }
        ],
        "status": "pending",
        "dateEntry": "2023-02-22 06:13:26",
        "dateProcessed": "2023-02-27 01:13:23",
        "id": 1
      },
      {
        "userId": "2",
        "client": "camila",
        "products": [
          {
            "product": "Café americano",
            "qty": 1
          },
          {
            "product": "Sandwich de jamón y queso",
            "qty": 1
          },
          {
            "product": "Jugo de frutas",
            "qty": 1
          }
        ],
        "status": "delivered",
        "dateEntry": "2023-02-22 06:13:43",
        "dateProcessed": "2023-02-22 06:13:43",
        "id": 2
      }
    ]}
    httpClientSpy.get.and.returnValue(of(mockResultPending));
    service.getOrderDemo()
    .subscribe({
      next: (result) => {
        
        expect(result).toEqual(mockResultPending);
        done();
      }
    })

  });
  it('envia las actualizaciones a la api demo', (done:DoneFn)=>{
    const mockResultPending = { "orders" :[
      {
        "userId": "2",
        "client": "camila",
        "products": [
          {
            "product": "Café americano",
            "qty": 1
          },
          {
            "product": "Sandwich de jamón y queso",
            "qty": 1
          },
          {
            "product": "Jugo de frutas",
            "qty": 1
          }
        ],
        "status": "pending",
        "dateEntry": "2023-02-22 06:13:26",
        "dateProcessed": "2023-02-27 01:13:23",
        "id": 1
      },
      {
        "userId": "2",
        "client": "camila",
        "products": [
          {
            "product": "Café americano",
            "qty": 1
          },
          {
            "product": "Sandwich de jamón y queso",
            "qty": 1
          },
          {
            "product": "Jugo de frutas",
            "qty": 1
          }
        ],
        "status": "delivered",
        "dateEntry": "2023-02-22 06:13:43",
        "dateProcessed": "2023-02-22 06:13:43",
        "id": 2
      }
    ]}
    const mockResultdone = 
    { "orders" :[
      {
        "userId": "2",
        "client": "camila",
        "products": [
          {
            "product": "Café americano",
            "qty": 1
          },
          {
            "product": "Sandwich de jamón y queso",
            "qty": 1
          },
          {
            "product": "Jugo de frutas",
            "qty": 1
          }
        ],
        "status": "pending",
        "dateEntry": "2023-02-22 06:13:26",
        "dateProcessed": "2023-02-27 01:13:23",
        "id": 1
      },
      {
        "userId": "2",
        "client": "camila",
        "products": [
          {
            "product": "Café americano",
            "qty": 1
          },
          {
            "product": "Sandwich de jamón y queso",
            "qty": 1
          },
          {
            "product": "Jugo de frutas",
            "qty": 1
          }
        ],
        "status": "delivered",
        "dateEntry": "2023-02-22 06:13:43",
        "dateProcessed": "2023-02-22 06:13:43",
        "id": 2
      }
    ]}
    httpClientSpy.post.and.returnValue(of(mockResultdone));
    service.setOrderDemo(mockResultPending)
    .subscribe({
      next: (result) => {
        
        expect(result).toEqual(mockResultdone);
        done();
      }
    })
  });

  it('sirve para crear varias ordenes para enviar a la api demo',()=>{
    const mockResult1 = [
      {
        "userId": "2",
        "client": "camila",
        "products": [
          {
            "product": "Café americano",
            "qty": 1
          },
          {
            "product": "Sandwich de jamón y queso",
            "qty": 1
          },
          {
            "product": "Jugo de frutas",
            "qty": 1
          }
        ],
        "status": "pending",
        "dateEntry": "2023-02-22 06:13:26",
        "dateProcessed": "2023-02-27 01:13:23",
        "id": '5522nnn'
      },
      {
        "userId": "2",
        "client": "camila",
        "products": [
          {
            "product": "Café americano",
            "qty": 1
          },
          {
            "product": "Sandwich de jamón y queso",
            "qty": 1
          },
          {
            "product": "Jugo de frutas",
            "qty": 1
          }
        ],
        "status": "pending",
        "dateEntry": "2023-02-22 06:13:43",
        "dateProcessed": "2023-02-22 06:13:43",
        "id": 'nnhn444'
      }
    ]
    const mockResult2 = {
      "userId": "2",
      "client": "camila",
      "products": [
        {
          "product": "Café con leche",
          "qty": 1
        },
        {
          "product": "Café americano",
          "qty": 1
        },
        {
          "product": "Sandwich de jamón y queso",
          "qty": 1
        },
        {
          "product": "Jugo de frutas",
          "qty": 1
        }
      ],
      "status": "canceled",
      "dateEntry": "2023-02-22 06:14:33",
      "dateProcessed": "2023-02-22 06:14:33",
      "id": 'hhhh'
    }
    const mockResDone = {
      "orders":[
        {
          "userId": "2",
          "client": "camila",
          "products": [
            {
              "product": "Café con leche",
              "qty": 1
            },
            {
              "product": "Café americano",
              "qty": 1
            },
            {
              "product": "Sandwich de jamón y queso",
              "qty": 1
            },
            {
              "product": "Jugo de frutas",
              "qty": 1
            }
          ],
          "status": "canceled",
          "dateEntry": "2023-02-22 06:14:33",
          "dateProcessed": "2023-02-22 06:14:33",
          "id": 'hhhh'
        },
        {
          "userId": "2",
          "client": "camila",
          "products": [
            {
              "product": "Café americano",
              "qty": 1
            },
            {
              "product": "Sandwich de jamón y queso",
              "qty": 1
            },
            {
              "product": "Jugo de frutas",
              "qty": 1
            }
          ],
          "status": "pending",
          "dateEntry": "2023-02-22 06:13:26",
          "dateProcessed": "2023-02-27 01:13:23",
          "id": '5522nnn'
        },
        {
          "userId": "2",
          "client": "camila",
          "products": [
            {
              "product": "Café americano",
              "qty": 1
            },
            {
              "product": "Sandwich de jamón y queso",
              "qty": 1
            },
            {
              "product": "Jugo de frutas",
              "qty": 1
            }
          ],
          "status": "pending",
          "dateEntry": "2023-02-22 06:13:43",
          "dateProcessed": "2023-02-22 06:13:43",
          "id": 'nnhn444'
        }
      ]
    }

   expect(service.crearOrdenMul(mockResult1, mockResult2)).toEqual(mockResDone)
  });

  it('edita una orden con el metodo PUT', (done: DoneFn)=>{
    const mockresponseEnvi = {
      id: '5',
      userId: '2',
      client: 'camila',
      products: [],
      status: 'pending',
      dateEntry: '2023-03-01 12:00 pm',
      dateProcessed:'2023-03-01 12:00 pm',
     }
    const mockresponse = {
      id: '5',
      userId: '2',
      client: 'camila',
      products: [],
      status: 'canceled',
      dateEntry: '2023-03-01 12:00 pm',
      dateProcessed:'2023-03-01 12:00 pm',
     }

   httpClientSpy.put.and.returnValue(of(mockresponse));
     service.editarOrder(5,mockresponseEnvi)
     .subscribe({
       next: (result) => {
         
         expect(result).toEqual(mockresponse);
         done();
       }
     })
  })
});
