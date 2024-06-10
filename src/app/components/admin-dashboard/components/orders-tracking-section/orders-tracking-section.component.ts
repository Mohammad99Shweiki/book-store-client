import { ORDER_STATUS_COLOR, TABLE_ITEMS_PER_PAGE } from '@/app.constants';
import { OrdersReportService } from '@/services/admin/orders-report.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';
import { ReportOrder } from '@/models/order';

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
    "address",
    "phoneNo",
    "actions"
  ];
  totalProfit: number = 0;
  displayedColumns = this.columns.filter(col => !['actions'].includes(col));

  constructor(
    private ordersReportService: OrdersReportService,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.ordersReportService.getOrdersReport().subscribe(res => {
      this.totalProfit = res.totalProfit;
      this.orders = res.orders.map((item, index) => ({ ...item, id: index + 1 }));
      this.loading = false;
    })
  }

  viewOrderDetails(order: ReportOrder) {
    this.dialog.open(OrderDetailsDialogComponent, {
      width: '800px',
      data: { order }
    })
  }
}
