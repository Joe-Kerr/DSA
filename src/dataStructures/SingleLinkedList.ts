class SingleLinkedListEl<Type> {
    public data : Type;
    public next : SingleLinkedListEl<Type>|null = null;

    constructor(data : Type) {
        this.data = data;
    }
}

/**@performance: duplicate code to safe function calls (todo?) */
export default class SingleLinkedList<Type> {
    private first : SingleLinkedListEl<Type>|null;
    private last : SingleLinkedListEl<Type>|null;

    private _length : number = 0;

    constructor(root : Type) {
        const newNode = new SingleLinkedListEl(root);
        this.first = newNode;
        this.last = newNode;
        this._length++;
    }

    get length() { return this._length; }

    public insertAtIndex(index : number, data : Type) {
        if(index === 0) {
            this.insertHead(data);
        }
        else if(index === this._length) {
            this.insertTail(data);
        }
        else {
            const newNode = new SingleLinkedListEl(data);

            let a : SingleLinkedListEl<Type>;
            let b : SingleLinkedListEl<Type>;

            this.iterateNode((node, i)=>{
                if(i === index - 1) {                    
                    a = node;
                }
                else if(i === index) {
                    b = node;
                }
            });  

            //@ts-ignore approved
            if(a && b) {                
                a.next = newNode;
                newNode.next = b;
                this._length++;
            }
        }
    }

    public insertHead(data : Type) {
        const oldNode = this.first;
        const newNode = new SingleLinkedListEl(data);

        newNode.next = oldNode;
        this.first = newNode;
        this._length++;
    }

    public insertTail(data : Type) {
        const oldNode = this.last;
        const newNode = new SingleLinkedListEl(data);

        if(oldNode) {
            oldNode.next = newNode;
        }
        
        this.last = newNode;
        this._length++;
    }

    public deleteIndex(index : number) {
        if(index === 0) {
            this.deleteHead();
        }
        else if(index === this._length - 1) {
            this.deleteTail();
        }
        else {
            let a : SingleLinkedListEl<Type>;
            let c : SingleLinkedListEl<Type>;

            this.iterateNode((node, i)=>{
                if(i === index - 1) {                    
                    a = node;
                }
                else if(i === index + 1) {
                    c = node;
                }
            });  

            //@ts-ignore approved
            if(a && c) {
                a.next = c;
                this._length--;
            }
        }
    }

    public deleteHead() {        
        if(this.first) {
            if(this.first.next === null) {
                this.first = null;
                this.last = null;
            }
            else {
                this.first = this.first.next;                                            
            }
            this._length--;
        }
    }

    public deleteTail() {
        if(this.last === null) {
            return;
        }

        if(this.first === this.last) {
            this.first.next = null;
            this.first = null;
            this.last = null;

        }
        else {
            const lastIndex = this.length-1;

            this.iterateNode((node, i)=>{
                if(i + 1 === lastIndex) {
                    node.next = null;
                    this.last = node;
                }
            });           
        }

        this._length--;
    }

    
    public has(data : Type) : boolean {
        let doesHave = false;
        this.iterateNode((node, i)=>{
            if(node.data === data) {
                doesHave = true;
            }
        });
        return doesHave;
    }


    public iterate(callback : (data : Type, index : number)=>(void)) {
        this.iterateNode((node, i)=>{
            callback(node.data, i);
        });
    }

    private iterateNode(callback : (data : SingleLinkedListEl<Type>, index : number)=>(void)) {
        let safety = this._length;
        let curNode = this.first;
        let i = 0;

        if(curNode === null) {
            return;
        }
        
        while(safety-- > 0 && curNode) {
            callback(curNode, i);
            i++;
            curNode = curNode.next;
        }
    }
}