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
    this.productsService.getAllProducts().subscribe(data => this.productsBefore = data)

    if (this.data.empcode != null && this.data.empcode != '') {
      this.editProduct(this.data.empcode);
    }

  }

  SaveEmployee() {
    if (this.Reactiveform.valid) {
      console.log(this.Reactiveform.value)

      console.log(this.productsBefore)
      let productsNew = this.productsService.crearProductMul(this.productsBefore.products, this.Reactiveform.value)
      this.productsService.setProductDemo(productsNew).subscribe({
        next: (data: any) => {

          Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )

        },
        error: (error) => {
          Swal.fire(
            'Good job!',
            'You clicked the button!',
            'error'
          )

        }
      })
      this.dialogref.close('save');
      this.productsService.getAllProducts()

    }
  }

  editProduct(id: any) {
      this.actionButton='editar'
      this.productsService.getAllProducts().subscribe({
        next: (data: any) => {
          let productEdit = data.products.filter((product: any) => product.id == `${id}`)
          let productsKeep = data.products.filter((product: any) => product.id != `${id}`)
          this.editData = productEdit[0]
          console.log(this.editData)
          this.Reactiveform.setValue({
            id: this.editData.id, name: this.editData.name, price: this.editData.price,
            image: this.editData.image, type: this.editData.type
          })

          if(this.Reactiveform.valid){
            let productsNew = this.productsService.crearProductMul(productsKeep, this.Reactiveform.value)
            console.log(productsNew)
          }
          


        }

      })
    }
  
}
