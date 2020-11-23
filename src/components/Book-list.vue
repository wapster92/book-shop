<template>
    <div>
        <h3 class="title">Список книг</h3>
        <h2 v-if="checkCat.length < 1">Выберете категорию</h2>
        <div class="books" v-else>
            <div class="book-list">
                <div class="book-list__item" v-for="book of books" :key="book.id">
                    <CardBook
                            :id="book.id"
                            :name="book.name"
                            :description="book.description"
                            :author="book.author"
                            :year="book.year"
                            :image="book.image"
                            :category_id="book.category_id"
                    ></CardBook>
                </div>
            </div>
            <div class="btn-wrap" v-if="next">
                <button class="btn" @click="getNextPage">Загрузить еще</button>
            </div>
        </div>

    </div>
</template>

<script>
    import CardBook from '../components/Card-book'
    export default {
        name: 'Book-list',
        components: {CardBook},
        methods: {
            getNextPage() {
                this.$store.commit('CHANGE_PAGE')
                this.$store.dispatch('GET_BOOKS')
            }
        },
        computed: {
            books() {
                return this.$store.state.books
            },
            checkCat() {
                return this.$store.state.checkedCat
            },
            next() {
                return this.$store.state.next
            }
        }
    }
</script>

<style lang="scss">
    .book-list {
        display: grid;
        grid-template-columns: repeat(auto-fit,250px);
        justify-content: center;
        gap: 30px;
        &__item {

        }
    }
    .btn-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
    }
    .btn {
        display: inline-flex;
        padding: 7px 12px;
        border: 1px solid var(--green);
        border-radius: 5px;
        color: var(--green);
        text-decoration: none;
        background: var(--white);
        transition: color .3s, background-color .3s, border-color .3s;
        cursor: pointer;
        font-size: 21px;
        &:hover {
            color: var(--white);
            border-color: var(--red);
            background: var(--red);
        }
    }
</style>