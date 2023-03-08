import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'app/products.service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {
  Reactiveform = new FormGroup({
    id: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    image: new FormControl("", Validators.required),
    type: new FormControl("", Validators.required),

  });

  productsBefore!: any;
  editData: any;
  actionButton: string = 'save';

  constructor(private productsService: ProductsService, public dialogref: MatDialogRef<ModalProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    //this.productsService.getAllProducts().subscribe(data => this.productsBefore = data)

    if (this.data.empcode != null && this.data.empcode != '') {
      this.editDataForm(this.data.empcode);
    }
  }

  saveProduct() {
    if (this.Reactiveform.valid) {
      this.productsService.newProductJson(this.Reactiveform.value).subscribe({
        next: (data: any) => {
          this.dialogref.close('save');
          Swal.fire(
            'Completado!',
            'Producto agregado con éxito!',
            'success'
          )
          this.dialogref.close('save');
        },
        error: (error) => {
          Swal.fire(
            'Error!',
            'No se ha podido agregar el producto!',
            'error'
          )

        }
      })
      this.dialogref.close('save');
      //this.productsService.getAllProducts()
    }
    this.dialogref.close('save');
  }

  editDataForm(id: any) {
    this.actionButton = 'editar'
    this.productsService.showProductsJson().subscribe({
      next: (data: any) => {
        let productEdit = data.filter((product: any) => product.id == `${id}`)
        //let productsKeep = data.products.filter((product: any) => product.id != `${id}`)
        this.editData = productEdit[0]
        console.log(this.editData)
        this.Reactiveform.setValue({
          id: this.editData.id, name: this.editData.name, price: this.editData.price,
          image: this.editData.image, type: this.editData.type
        })
      }
    })
    this.editData= ''
  }

  editProduct() {
    this.actionButton = 'editar'

    if (this.Reactiveform.valid) {
      this.productsService.editProductJson(this.Reactiveform.value.id, this.Reactiveform.value).subscribe({
        next: (data: any) => {
          this.dialogref.close('editar');
          Swal.fire(
            'Completado!',
            'Producto editado!',
            'success'
          )
        },
        error: (error) => {
          Swal.fire(
            'Error!',
            'No se ha podido editar el producto!',
            'error'
          )
        }
      })
      this.dialogref.close('editar');
    }
  

}
  //APIIIIIIIII  ONLINE
  // ngOnInit() {
  //   this.productsService.getAllProducts().subscribe(data => this.productsBefore = data)

  //   if (this.data.empcode != null && this.data.empcode != '') {
  //     this.editDataForm(this.data.empcode);
  //   }
  // }

  // saveProduct() {
  //   if (this.Reactiveform.valid) {
  //     console.log(this.Reactiveform.value)
  //     console.log(this.productsBefore)
  //     let productsNew = this.productsService.crearProductMul(this.productsBefore.products, this.Reactiveform.value)
  //     this.productsService.setProductDemo(productsNew).subscribe({
  //       next: (data: any) => {
  //         Swal.fire(
  //           'Completado!',
  //           'Producto agregado con éxito!',
  //           'success'
  //         )
  //       },
  //       error: (error) => {
  //         Swal.fire(
  //           'Error!',
  //           'No se ha podido agregar el producto!',
  //           'error'
  //         )

  //       }
  //     })
  //     this.dialogref.close('save');
  //     this.productsService.getAllProducts()
  //   }
  // }

  // editDataForm(id: any) {
  //   this.actionButton = 'editar'
  //   this.productsService.getAllProducts().subscribe({
  //     next: (data: any) => {
  //       let productEdit = data.products.filter((product: any) => product.id == `${id}`)
  //       //let productsKeep = data.products.filter((product: any) => product.id != `${id}`)
  //       this.editData = productEdit[0]
  //       console.log(this.editData)
  //       this.Reactiveform.setValue({
  //         id: this.editData.id, name: this.editData.name, price: this.editData.price,
  //         image: this.editData.image, type: this.editData.type
  //       })
  //     }
  //   })
  // }

  // editProduct() {
  //   this.actionButton = 'editar'
  //   this.productsService.getAllProducts().subscribe({
  //     next: (data: any) => {
  //       //let productEdit = data.products.filter((product: any) => product.id == `${id}`)
  //       let productsKeep = data.products.filter((product: any) => product.id != this.Reactiveform.value.id)

  //       if (this.Reactiveform.valid) {
  //         let productsNew = this.productsService.crearProductMul(productsKeep, this.Reactiveform.value)
  //         console.log(productsNew)
  //         this.productsService.setProductDemo(productsNew).subscribe({
  //           next: (data: any) => {
  //             Swal.fire(
  //               'Completado!',
  //               'Producto editado con éxito!',
  //               'success'
  //             )
  //           },
  //           error: (error) => {
  //             Swal.fire(
  //               'Error!',
  //               'No se ha podido editar el producto!',
  //               'error'
  //             )
  //           }
  //         })
  //         this.dialogref.close('save');
  //       }
  //     }
  //   })
  // }

}
