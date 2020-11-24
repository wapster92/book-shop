<template>
    <div>
        <div class="search">
            <label class="search__label" for="search">Поиск по выбранным категориям</label>
            <input class="search__input" type="text" id="search" v-model="search" :disabled="!checkCat.length > 0">
        </div>
        <h3 class="title">Список книг</h3>
        <h2 v-if="checkCat.length < 1">Выберете категорию</h2>
        <div class="books" v-else>
            <div class="book-list">
                <div class="book-list__item" v-for="book of searchBooks" :key="book.id">
                    <CardBook
                            :id="book.id"
                            :name="book.name"
                            :description="book.description"
                            :author="book.author"
                            :year="book.year"
                            :image="book.image"
                            :category_id="book.category_id"
                            :search="search"
                    ></CardBook>
                </div>
            </div>
            <div class="btn-wrap" v-if="next">
                <button class="btn" @click="getNextPage">
                    <span v-if="!load">Загрузить еще</span>
                    <span v-else>Загрузка</span>
                </button>
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
            search: {
                get() {
                    return this.$store.state.search
                },
                set(val) {
                    this.$store.commit('CHANGE_SEARCH', val)
                    const catsString = this.checkCat.join()
                    this.$router.replace({path: '/', query: {cat: catsString, search: this.search}})
                }
            },
            searchBooks() {
                const s = this.search.toLowerCase()
                const re = new RegExp(s,'ig')
                return this.books.filter(el => {
                    return Object.values(el).some(m => {
                        return re.test(m)
                    })
                })
            },
            books() {
                return this.$store.state.books
            },
            checkCat() {
                return this.$store.state.checkedCat
            },
            next() {
                return this.$store.state.next
            },
            load() {
                return this.$store.state.load
            }
        },
        watch: {
            searchBooks(val) {
                if(val.length < 10 && this.next && this.checkCat.length) {
                    this.$store.commit('CHANGE_PAGE')
                    this.$store.dispatch('GET_BOOKS')
                }
            },
            search(val) {
                if(val.length <= 0) {
                    this.$store.commit('RESET')
                    this.$store.dispatch('GET_BOOKS')
                }
            }
        }
    }
</script>

<style lang="scss">
    .search {
        border: 1px solid #2c3e50;
        border-left: none;
        border-right: none;
        padding: 20px 0;
        margin-top: 20px;
        display: flex;
        align-items: center;
        &__label {
            margin-right: 15px;
        }
        &__input {
            width: 200px;
            height: 30px;
            border: 1px solid #2c3e50;
            padding: 0 10px;
            border-radius: 5px;
        }
    }
    .book-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
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