import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit{
  users!:any[];

  dataSource=new MatTableDataSource<any>()
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!:MatSort

  constructor(private authService:AuthService, private router:Router){}

  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator
    this.dataSource.sort=this.sort
  }

  displayedColumns: string[]=['id','username','email','createdAt','edit']
  applyFilter(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase()
  }

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData():void{
    this.authService.showaAllUser()
    .subscribe(res=> this.dataSource.data= res)
    console.log(this.dataSource.data)
  }

  deleteUser(id:number){
    if(confirm('are you sure you want to delete this user?')){
      this.authService.deleteUserByAdmin(id).subscribe(()=>{
        this.dataSource.data= this.dataSource.data.filter(user => user.id!==id)
      },
      error =>{
        console.log(error)
      })
    }
    this.authService.reloadCurrentRoute()
  }

  updateUser(user:any){
    this.authService.updateUser(user.id,user).subscribe((res)=>{

    },
    (err)=>{
      console.log(err)
    });
    user.isEdit=false;
  }

  status(item:any){
    item.isEdit=true;
  }
}
