<template>
    <div class="about">
        <div>
            <input type="text" v-model="title">
            <div>
                <textarea v-model="content"></textarea>
            </div>
            <div class="center">
                <button @click="save">保存</button>
                <button @click="remove" v-if="memo.id">削除</button>
            </div>
        </div>
    </div>
</template>

<script>
// 外部から読み込めるようにする
export default {
    name: 'MemoForm',
    props: [
        'memo',
    ],
    // v-modelは双方向
    data(){
        return{
            title: this.memo.title,
            content: this.memo.content,
        }
    },
    methods:{
        save(){
            let memo = {
                title: this.title,
                content: this.content
            }

            // this.memo.id:propsで渡されたmemoのid
            // memo.id:memoのid
            if(this.memo.id){
                memo.id = this.memo.id
            }
            // saveというミューテーションにmemoを渡す
            this.$store.commit('save', memo)
            // 強制的に移動
            this.$router.push('/')
        },
        remove(){
            this.$store.commit('delete', this.memo.id)
            // 強制的に移動
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
div {
    margin-bottom: 10px;
}

input[type=text] {
    width: 100%;
}

textarea {
    width: 100%;
    height: 30em;
}

button {
    width: 5em;
    margin: 3px;
}

.center {
    text-align: center;
}</style>