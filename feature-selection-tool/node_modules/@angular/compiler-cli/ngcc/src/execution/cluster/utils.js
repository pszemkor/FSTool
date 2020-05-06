/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/execution/cluster/utils", ["require", "exports", "cluster"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference types="node" />
    var cluster = require("cluster");
    /** Expose a `Promise` instance as well as APIs for resolving/rejecting it. */
    var Deferred = /** @class */ (function () {
        function Deferred() {
            var _this = this;
            /** The `Promise` instance associated with this deferred. */
            this.promise = new Promise(function (resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
            });
        }
        return Deferred;
    }());
    exports.Deferred = Deferred;
    /**
     * Send a message to the cluster master.
     * (This function should be invoked from cluster workers only.)
     *
     * @param msg The message to send to the cluster master.
     */
    exports.sendMessageToMaster = function (msg) {
        if (cluster.isMaster) {
            throw new Error('Unable to send message to the master process: Already on the master process.');
        }
        if (process.send === undefined) {
            // Theoretically, this should never happen on a worker process.
            throw new Error('Unable to send message to the master process: Missing `process.send()`.');
        }
        process.send(msg);
    };
    /**
     * Send a message to a cluster worker.
     * (This function should be invoked from the cluster master only.)
     *
     * @param workerId The ID of the recipient worker.
     * @param msg The message to send to the worker.
     */
    exports.sendMessageToWorker = function (workerId, msg) {
        if (!cluster.isMaster) {
            throw new Error('Unable to send message to worker process: Sender is not the master process.');
        }
        var worker = cluster.workers[workerId];
        if ((worker === undefined) || worker.isDead() || !worker.isConnected()) {
            throw new Error('Unable to send message to worker process: Recipient does not exist or has disconnected.');
        }
        worker.send(msg);
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvbmdjYy9zcmMvZXhlY3V0aW9uL2NsdXN0ZXIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCw4QkFBOEI7SUFFOUIsaUNBQW1DO0lBTW5DLDhFQUE4RTtJQUM5RTtRQUFBO1lBQUEsaUJBc0JDO1lBTEMsNERBQTREO1lBQzVELFlBQU8sR0FBRyxJQUFJLE9BQU8sQ0FBSSxVQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUN2QyxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDdkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUQsZUFBQztJQUFELENBQUMsQUF0QkQsSUFzQkM7SUF0QlksNEJBQVE7SUF3QnJCOzs7OztPQUtHO0lBQ1UsUUFBQSxtQkFBbUIsR0FBRyxVQUFDLEdBQXNCO1FBQ3hELElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLDhFQUE4RSxDQUFDLENBQUM7U0FDakc7UUFFRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzlCLCtEQUErRDtZQUMvRCxNQUFNLElBQUksS0FBSyxDQUFDLHlFQUF5RSxDQUFDLENBQUM7U0FDNUY7UUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQztJQUVGOzs7Ozs7T0FNRztJQUNVLFFBQUEsbUJBQW1CLEdBQUcsVUFBQyxRQUFnQixFQUFFLEdBQW9CO1FBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkVBQTZFLENBQUMsQ0FBQztTQUNoRztRQUVELElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDdEUsTUFBTSxJQUFJLEtBQUssQ0FDWCx5RkFBeUYsQ0FBQyxDQUFDO1NBQ2hHO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwibm9kZVwiIC8+XG5cbmltcG9ydCAqIGFzIGNsdXN0ZXIgZnJvbSAnY2x1c3Rlcic7XG5cbmltcG9ydCB7TWVzc2FnZUZyb21Xb3JrZXIsIE1lc3NhZ2VUb1dvcmtlcn0gZnJvbSAnLi9hcGknO1xuXG5cblxuLyoqIEV4cG9zZSBhIGBQcm9taXNlYCBpbnN0YW5jZSBhcyB3ZWxsIGFzIEFQSXMgZm9yIHJlc29sdmluZy9yZWplY3RpbmcgaXQuICovXG5leHBvcnQgY2xhc3MgRGVmZXJyZWQ8VD4ge1xuICAvKipcbiAgICogUmVzb2x2ZSB0aGUgYXNzb2NpYXRlZCBwcm9taXNlIHdpdGggdGhlIHNwZWNpZmllZCB2YWx1ZS5cbiAgICogSWYgdGhlIHZhbHVlIGlzIGEgcmVqZWN0aW9uIChjb25zdHJ1Y3RlZCB3aXRoIGBQcm9taXNlLnJlamVjdCgpYCksIHRoZSBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWRcbiAgICogaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byByZXNvbHZlIHRoZSBwcm9taXNlIHdpdGguXG4gICAqL1xuICByZXNvbHZlITogKHZhbHVlOiBUKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZWplY3RzIHRoZSBhc3NvY2lhdGVkIHByb21pc2Ugd2l0aCB0aGUgc3BlY2lmaWVkIHJlYXNvbi5cbiAgICpcbiAgICogQHBhcmFtIHJlYXNvbiBUaGUgcmVqZWN0aW9uIHJlYXNvbi5cbiAgICovXG4gIHJlamVjdCE6IChyZWFzb246IGFueSkgPT4gdm9pZDtcblxuICAvKiogVGhlIGBQcm9taXNlYCBpbnN0YW5jZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBkZWZlcnJlZC4gKi9cbiAgcHJvbWlzZSA9IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICAgIHRoaXMucmVqZWN0ID0gcmVqZWN0O1xuICB9KTtcbn1cblxuLyoqXG4gKiBTZW5kIGEgbWVzc2FnZSB0byB0aGUgY2x1c3RlciBtYXN0ZXIuXG4gKiAoVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgaW52b2tlZCBmcm9tIGNsdXN0ZXIgd29ya2VycyBvbmx5LilcbiAqXG4gKiBAcGFyYW0gbXNnIFRoZSBtZXNzYWdlIHRvIHNlbmQgdG8gdGhlIGNsdXN0ZXIgbWFzdGVyLlxuICovXG5leHBvcnQgY29uc3Qgc2VuZE1lc3NhZ2VUb01hc3RlciA9IChtc2c6IE1lc3NhZ2VGcm9tV29ya2VyKTogdm9pZCA9PiB7XG4gIGlmIChjbHVzdGVyLmlzTWFzdGVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gc2VuZCBtZXNzYWdlIHRvIHRoZSBtYXN0ZXIgcHJvY2VzczogQWxyZWFkeSBvbiB0aGUgbWFzdGVyIHByb2Nlc3MuJyk7XG4gIH1cblxuICBpZiAocHJvY2Vzcy5zZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBUaGVvcmV0aWNhbGx5LCB0aGlzIHNob3VsZCBuZXZlciBoYXBwZW4gb24gYSB3b3JrZXIgcHJvY2Vzcy5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBzZW5kIG1lc3NhZ2UgdG8gdGhlIG1hc3RlciBwcm9jZXNzOiBNaXNzaW5nIGBwcm9jZXNzLnNlbmQoKWAuJyk7XG4gIH1cblxuICBwcm9jZXNzLnNlbmQobXNnKTtcbn07XG5cbi8qKlxuICogU2VuZCBhIG1lc3NhZ2UgdG8gYSBjbHVzdGVyIHdvcmtlci5cbiAqIChUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSBpbnZva2VkIGZyb20gdGhlIGNsdXN0ZXIgbWFzdGVyIG9ubHkuKVxuICpcbiAqIEBwYXJhbSB3b3JrZXJJZCBUaGUgSUQgb2YgdGhlIHJlY2lwaWVudCB3b3JrZXIuXG4gKiBAcGFyYW0gbXNnIFRoZSBtZXNzYWdlIHRvIHNlbmQgdG8gdGhlIHdvcmtlci5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlbmRNZXNzYWdlVG9Xb3JrZXIgPSAod29ya2VySWQ6IG51bWJlciwgbXNnOiBNZXNzYWdlVG9Xb3JrZXIpOiB2b2lkID0+IHtcbiAgaWYgKCFjbHVzdGVyLmlzTWFzdGVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gc2VuZCBtZXNzYWdlIHRvIHdvcmtlciBwcm9jZXNzOiBTZW5kZXIgaXMgbm90IHRoZSBtYXN0ZXIgcHJvY2Vzcy4nKTtcbiAgfVxuXG4gIGNvbnN0IHdvcmtlciA9IGNsdXN0ZXIud29ya2Vyc1t3b3JrZXJJZF07XG5cbiAgaWYgKCh3b3JrZXIgPT09IHVuZGVmaW5lZCkgfHwgd29ya2VyLmlzRGVhZCgpIHx8ICF3b3JrZXIuaXNDb25uZWN0ZWQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1VuYWJsZSB0byBzZW5kIG1lc3NhZ2UgdG8gd29ya2VyIHByb2Nlc3M6IFJlY2lwaWVudCBkb2VzIG5vdCBleGlzdCBvciBoYXMgZGlzY29ubmVjdGVkLicpO1xuICB9XG5cbiAgd29ya2VyLnNlbmQobXNnKTtcbn07XG4iXX0=