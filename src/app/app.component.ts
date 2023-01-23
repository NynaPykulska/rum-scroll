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
      applicationId: '',
      clientToken: '',
      site: 'datadoghq.eu',
      service: 'konsolidatorui-scrolltest',
      version: '0.0.0',
      env: 'test',
      sampleRate: 100,
      trackInteractions: true,
    });
    datadogRum.startSessionReplayRecording();
  }

  getDataFromFile() {
    return this.http.get<any>('assets/data.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
  }
}
