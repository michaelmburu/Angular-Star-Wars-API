import { LogService } from './log.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable()
export class StarWarsService {

    private characters = [
        { name: 'Luke SkyWalker', side: '' },
        { name: 'Darth Vader', side: '' }
    ]

    url = 'https://swapi.co/api/people/'
    private logService: LogService;
    charactersChanged = new Subject<void>();
    http: HttpClient

    constructor(logService: LogService, http: HttpClient) {
        this.logService = logService;
        this.http = http
    }

    fetchCharacters() {
        this.http.get(this.url)
        .pipe(map(
            (response: any) => {
                const data = response.results;
                var chars = data.map((char) => {
                    return {name:char.name, side:''};
                })
                return chars;
            }
        ))
        .subscribe((res) => {
                console.log(res);
                this.characters = res
                this.charactersChanged.next()
            });
    }

    getCharacters(chosenList) {
        if (chosenList === 'all') {
            return this.characters.slice();
        }
        return this.characters.filter((char) => {
            return char.side == chosenList;
        })
    }

    onSideChosen(charInfo) {
        const pos = this.characters.findIndex((char) => {
            return char.name == charInfo.name;
        })
        this.characters[pos].side = charInfo.side;
        this.charactersChanged.next();
        this.logService.writeLog(`Changed side of ` + charInfo.name + "new side:" + charInfo.side);
    }

    addCharacter(name, side) {

        //Check if name exists in characters array
        const pos = this.characters.findIndex((char) => {
            return char.name === name;
        })

        if (pos !== -1) {
            return;
        }


        const newChar = { name: name, side: side };
        this, this.characters.push(newChar);
    }

}