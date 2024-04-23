import { SpaceApiService } from './../../services/space-api.service'
import { SpaceApi } from './../../models/space-api'
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  dataSource = new MatTableDataSource<SpaceApi>([])
  pageSize = 10
  pageSizeOptions: number[] = [5, 10, 25, 100]
  totalItems = 0
  pageIndex = 10
  spaceApi: SpaceApi[] = []
  displayedColumns: string[] = [
    'id',
    'title',
    'url',
    'image_url',
    'news_site',
    'summary',
    'published_at',
    'updated_at',
    'featured'
  ]
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchtext') searchText: ElementRef<HTMLInputElement>
  @ViewChild('dataInicial') dataInicial: ElementRef<HTMLInputElement>
  @ViewChild('dataFinal') dataFinal: ElementRef<HTMLInputElement>

  constructor(
    private spaceApiService: SpaceApiService,
    private _liveAnnouncer: LiveAnnouncer,
    private searchTextCtor: ElementRef<HTMLInputElement>,
    private dataInicialCtor: ElementRef<HTMLInputElement>,
    private dataFinalCtor: ElementRef<HTMLInputElement>,
  ) {
    this.paginator = {} as MatPaginator
    this.sort = {} as MatSort
    this.searchText = searchTextCtor
    this.dataFinal = dataFinalCtor
    this.dataInicial = dataInicialCtor
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.spaceApiService.getAllArticles(
      (this.pageSize).toString(),
      (this.pageIndex + 10).toString(),
      this.searchText?.nativeElement.value,
      this.dataInicial?.nativeElement.value,
      this.dataFinal?.nativeElement.value
    ).subscribe(
      (resposta) => {
        this.spaceApi = resposta.results
        this.dataSource.data = this.spaceApi
        this.totalItems = resposta.count
        this.dataSource.sort = this.sort
      })
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }
}
