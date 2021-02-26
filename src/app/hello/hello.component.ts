import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { share } from "rxjs/operators";

@Component({
  selector: "hello",
  templateUrl: "./hello.component.html"
})
export class HelloComponent implements OnInit {
  @Input() name: string;
  private opt = 0;

  ngOnInit() {
    switch(this.opt){
      case 0: {
        /*
      Promise - Emite un solo valor
      Observable - Emite multiple valores
    */
    const numberPromise = new Promise((resolve, reject) => {
      resolve(5);
      reject(0);
    });

    numberPromise.then(
      value => console.log(`***Promise ${value}`)
    );

    const numberObservables = new Observable(observer => {
      observer.next(5);
      observer.next(15);
    });

    numberObservables.subscribe(
      value => console.log(`***Observables ${value}`)
    );
        break;
      }
      case 1: {
        /*
      Promise - Eager to execute
      Observable - Executes only when it is called or someone is subscribing
    */

    const promise = new Promise(() => 
      console.log(`Promise is called`)
    );

    const observable = new Observable(() =>
      console.log(`Observable is called`)
    );
    observable.subscribe();

        break;
      }
      case 2: {
        /*
      Promise - Not sharable
      Observable - Can be shared and subscribed that shared value by multiple subscribers. And all the subscribers will execute at a single point of time.
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
         /*
      Promise - Not cancellable
      Observable - Can be cancellable
    */

    const cancellable = new Observable(observer => {
      let i = 0;
      setInterval(() => {
        observer.next(i++);
      }, 1000);
    });

    const cancellableSubscription = cancellable.subscribe(
      value => console.log(value)
    );
    cancellableSubscription.unsubscribe();

        break;
      }
      case 4: {
        /*
      Promise - Always asynchronous
      Observable - possibly asynchronous
    */
    const asyncPromise = new Promise(
      resolve => resolve(5)
    );

    asyncPromise.then(
      value => console.log(`Everytime Asyn promise ${value}!`)
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