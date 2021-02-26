import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { share } from "rxjs/operators";

@Component({
  selector: "hello",
  templateUrl: "./hello.component.html"
})
export class HelloComponent implements OnInit {
  @Input() name: string;
  private opt = 2;

  ngOnInit() {
    switch (this.opt) {
      case 0: {
        /* Promise - Emite un solo valor
         * Observable - Emite multiple valores
         */
        const numberPromise = new Promise((resolve, reject) => {
          resolve(5);
          reject(0);
        });

        numberPromise.then(value => console.log(`Promise ${value}`));

        const numberObservables = new Observable(observer => {
          observer.next(5);
          observer.next(15);
        });

        numberObservables.subscribe(value =>
          console.log(`Observables ${value}`)
        );
        break;
      }
      case 1: {
        /* Promise - Ejecución ansiosa
         * Observable - Se ejecuta solo cuando se llama o alguien se está suscribiendo
         */
        const promise = new Promise(() => console.log(`Promise is called`));

        const observable = new Observable(() =>
          console.log(`Observable is called`)
        );
        observable.subscribe();

        break;
      }
      case 2: {
        /* Promise - No comparte valores
         * Observable - Puede ser compartido y suscrito ese valor compartido por múltiples suscriptores. Y todos los suscriptores se ejecutarán en un solo momento.
         */
        const observableToShare = new Observable(observer => {
          console.log(`I was called at ${new Date()}`);
          setTimeout(() => observer.next(), 2000);
        });

        const sharedObserable = observableToShare.pipe(share());
        sharedObserable.subscribe(() =>
          console.log(`some task 1 at ${new Date()}`)
        );
        sharedObserable.subscribe(() =>
          console.log(`some task 2 at ${new Date()}`)
        );
        break;
      }
      case 3: {
        /* Promise - No cancelable
         * Observable - Puede ser cancelable
         */
        const cancellable = new Observable(observer => {
          let i = 0;
          setInterval(() => {
            observer.next(i++);
          }, 1000);
        });

        const cancellableSubscription = cancellable.subscribe(value =>
          console.log(value)
        );
        cancellableSubscription.unsubscribe();
        break;
      }
      case 4: {
        /* Promise - Siempre es asíncrono
         * Observable - Posible asíncrono
         */
        const asyncPromise = new Promise(resolve => resolve(5));

        asyncPromise.then(value =>
          console.log(`Everytime Asyn promise ${value}!`)
        );
        console.log("And now we are here with promise");

        const possibleAsyncObservable = new Observable(observer =>
          observer.next(5)
        );

        possibleAsyncObservable.subscribe(value =>
          console.log(`Possible Async observable ${value} !`)
        );
        console.log("And now we are here with observables");
        break;
      }
    }
  }
}
