import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FavoritosDTO} from '../_models/favoritos.dto';

@Injectable()
export class FavoritosService {

    constructor(private firestore: AngularFirestore) {
    }

    create(papel: FavoritosDTO) {
        return this.firestore.collection('Favoritos').add(papel);
    }

    findAll() {
        return this.firestore.collection('Favoritos', res => res.orderBy('papel', 'asc')).snapshotChanges();
    }

    remove(id) {
        return this.firestore.doc('Favoritos/' + id).delete();
    }

    findById(id) {
        return this.firestore.doc('Favoritos/' + id).get();
    }
}
