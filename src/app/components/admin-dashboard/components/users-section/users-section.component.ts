import { TABLE_ITEMS_PER_PAGE } from '@/app.constants';
import { ConfirmationModalComponent } from '@/components/confirmation-modal/confirmation-modal.component';
import { UserService } from '@/services/user/user.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { UserDetailsDialogComponent } from '../user-details-dialog/user-details-dialog.component';
import { UserData } from '@/models/userData';

@Component({
  selector: 'app-users-section',
  templateUrl: './users-section.component.html',
  styleUrls: ['./users-section.component.css']
})
export class UsersSectionComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = [];
  actions: [];
  loading = true;
  columns: string[] = [
    "userId",
    "username",
    "firstName",
    "lastName",
    "email",
    "wallet",
    "actions"
  ];

  displayedColumns = this.columns.filter(col => col != 'actions')
  users: UserData[];
  resultLength!: number;
  itemsPerPage = TABLE_ITEMS_PER_PAGE
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private toaster: ToastrService
  ) {

  }

  ngAfterViewInit() {

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.userService!.getAllUsers(
            this.paginator.pageIndex,
          ).pipe(catchError(() => of(null)));
        }),
        map(data => {
          this.loading = false;

          if (data === null) {
            return [];
          }

          this.resultLength = data.totalElements;
          return data;
        }),
      )
      .subscribe(data => (this.users = data.content));
  }


  fetchUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe(res => {
      this.users = res.content;
      this.loading = false;
    });
  }

  deleteUser(user: UserData) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to delete this nigga?',
        isDelete: true
      }
    })

    dialogRef.afterClosed().subscribe((res: UserData) => {
      if (res) {
        this.userService.deleteUser(user.userId).subscribe({
          next: () => {
            this.fetchUsers();
            this.toaster.success('User deleted successfully')
          },
          error: () => {
            this.toaster.error('Error occurred')
          }
        })
      }
    })
  }

  openUserDialog(user: UserData | null) {
    const dialogRef = this.dialog.open(UserDetailsDialogComponent, {
      width: '800px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe((user: UserData) => {
      if (user) {
        this.userService.updateProfile(user.userId, user).subscribe({
          next: () => {
            this.fetchUsers();
            this.toaster.success('User updated successfully')
          },
          error: () => {
            this.toaster.error('Something went wrong')
          }
        });
      }
    })
  }
}
