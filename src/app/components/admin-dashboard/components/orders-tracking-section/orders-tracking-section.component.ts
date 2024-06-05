import { ORDER_STATUS_COLOR, TABLE_ITEMS_PER_PAGE } from '@/app.constants';
import { OrdersReportService } from '@/services/admin/orders-report.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-orders-tracking-section',
  templateUrl: './orders-tracking-section.component.html',
  styleUrls: ['./orders-tracking-section.component.css']
})
export class OrdersTrackingSectionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  itemsPerPage = TABLE_ITEMS_PER_PAGE;
  resultLength!: number;
  orders: any[] = [];
  loading = true;
  columns: string[] = [
    "id",
    "date",
    "totalPrice",
    "status",
    "address",
    "phoneNo",
    "actions"
  ];
  orderStatusMap: any = [];
  totalProfit: number = 0;
  displayedColumns = this.columns.filter(col => !['actions'].includes(col));

  constructor(
    private ordersReportService: OrdersReportService,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.ordersReportService.getOrdersReport().subscribe(res => {
      console.log(res);
      this.totalProfit = res.totalProfit;
      this.orders = res.orders.map((item, index) => ({ ...item, id: index + 1 }));
      this.orderStatusMap = Object.entries(res.orderStatusMap)
        .map(item => ({
          title: item[0],
          count: item[1],
          bg: ORDER_STATUS_COLOR[item[0]].bg,
          text: ORDER_STATUS_COLOR[item[0]].text,
        }))
      this.loading = false;
    })
  }

  viewOrderDetails(order: any) {
    this.dialog.open(OrderDetailsDialogComponent, {
      width: '400px',
      data: { order }
    })
  }
}
