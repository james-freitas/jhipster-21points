import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Setting } from './setting.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SettingService {

    private resourceUrl = SERVER_API_URL + 'api/settings';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/settings';

    constructor(private http: Http) { }

    create(setting: Setting): Observable<Setting> {
        const copy = this.convert(setting);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(setting: Setting): Observable<Setting> {
        const copy = this.convert(setting);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Setting> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Setting.
     */
    private convertItemFromServer(json: any): Setting {
        const entity: Setting = Object.assign(new Setting(), json);
        return entity;
    }

    /**
     * Convert a Setting to a JSON which can be sent to the server.
     */
    private convert(setting: Setting): Setting {
        const copy: Setting = Object.assign({}, setting);
        return copy;
    }
}
