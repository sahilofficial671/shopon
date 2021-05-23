import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-front-category-detail',
  templateUrl: './front-category-detail.component.html',
  styleUrls: ['./front-category-detail.component.css']
})
export class FrontCategoryDetailComponent implements OnInit {

  category:Category;
  slug:string;

  isLoaded:boolean;

  constructor(
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.categoryService
    .getCategoryBySlug(this.slug)
    .toPromise()
    .then((data) => {
      if(data.category){
        this.category = this.categoryService.getCategoriesMappedToModel([data.category])[0];
        console.log(this.category);
      }
      this.isLoaded = true;

    }).catch((err) => {
      if(err.status == 'error' && err.message != null){
        this.toastr.error(err.message)
        return;
      }

      if(err.errors && err.errors.length > 0 && err.errors[0].defaultMessage != null){
        this.toastr.error(err.errors[0].defaultMessage)
        return;
      }

      console.log(err)

      this.isLoaded = true;
      this.toastr.error("Something went wrong. Please try again later");
    });
  }
}
