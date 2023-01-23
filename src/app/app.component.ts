import {Component, OnInit} from '@angular/core';
import {datadogRum} from "@datadog/browser-rum";
import {TreeNode} from "primeng/api";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  files1: TreeNode[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDataFromFile().then(files => this.files1 = files);


    datadogRum.init({
      applicationId: '085e3340-508d-44ba-89e4-83f663d522a2',
      clientToken: 'pub51bf97289acd53debf656c966d521287',
      site: 'datadoghq.eu',
      service: 'konsolidatorui',
      version: '0.0.0',
      env: 'test',
      sampleRate: 100,
      trackInteractions: true,
      allowedTracingOrigins: ['https://uiapi.test.konsolidator.com/api'],
    });
    // datadogRum.startSessionReplayRecording();
  }

  getDataFromFile() {
    return this.http.get<any>('assets/data.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
  }
}
