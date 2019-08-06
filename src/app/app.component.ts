import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from './shared';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit,DoCheck {
  private url = "https://api.themoviedb.org/3/search/movie?api_key=f9dba24a3b8ed9425600eb5d5fbd9a93&query=star";
  public movies : any;
  public result : any;
  states:string[]=[];
  searchVal='';
  displayRes : string[] = [];
  stateForm: FormGroup;
  showDropDown = false;
  showDiv = true;
  flag = false;
  showLoading = false;
  selectedVal:any;
  cloneMovie:any;
  selectUrl:any; 

  constructor( private fb: FormBuilder,private apiService:ApiService) {
    this.initForm()
  }
  initForm(): FormGroup {
    return this.stateForm = this.fb.group({
      search: [null]
    })
  }
  ngOnInit() {
    this.apiService.getMovies(this.url).subscribe(
    data =>{
      this.movies=data.json()['results'];
      for(var i=0;i<20;i++)
      {
        this.result=this.movies[i].title;
        this.states[i]=this.result;
      } 
    }
  );

}


ngDoCheck(){

if(this.flag==true)
{
  this.movies = null;
  this.apiService.getMovies(this.url).subscribe(
    data =>{
      this.cloneMovie=data.json()['results'];
      for(var i=0;i<19;i++){
        if(this.selectedVal==this.cloneMovie[i].title){
          this.movies=this.cloneMovie[i];
          break;
        }
      }
    }
  );
  this.flag = false;
  if(this.flag == false)
  {
    this.apiService.getMovies(this.url).subscribe(
      data =>{
        this.movies=data.json()['results'];
        for(var i=0;i<20;i++)
        {
          this.result=this.movies[i].title;
          this.states[i]=this.result;
        } 
      }
    );
  }
  }
}
  
onKeyUp() {
  this.showLoading = true;
}
 selectValue(value) {
  this.selectedVal=" ";
   this.stateForm.patchValue({"search": value});
   this.showDropDown = false;
   this.flag = true;
   console.log(value)
   this.selectedVal=value;
   this.showLoading = false;
 }
  closeDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  openDropDown() {
    this.showDropDown = false;
    this.showDiv = false;
  }

  getSearchValue() {

    return this.stateForm.value.search;
  }

  onClear(){
    this.searchVal=' ';
    this.showDiv = true;
  }
}
