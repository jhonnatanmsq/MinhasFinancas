import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {DividendosDTO} from '../_models/dividendos.dto';

@Injectable()
export class DividendosService {

    constructor(private firestore: AngularFirestore) {
    }

    create(dividendo: DividendosDTO) {
        return this.firestore.collection(`Dividendos`).add(dividendo);
    }

    findAll() {
        return this.firestore.collection('Dividendos', res => res.orderBy('dataDividendo', 'asc')).snapshotChanges();
    }

    deletar(id) {
        return this.firestore.doc(`Dividendos/${id}`).delete();
    }

    findById(id) {
        return this.firestore.doc(`Dividendos/${id}`).get();
    }
}
