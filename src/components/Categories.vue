<template>
    <div>
        <h3 class="title">Категории</h3>
        <nav class="nav-tags">
            <ul class="nav-tags__list">
                <li class="nav-tags__item" v-for="cat of categories">
                    <a href="#" class="nav-tags__link" :class="addActiveClass(cat.id)" @click.prevent="addCat($event, cat.id)">{{cat.name}}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'Categories',
        methods: {
            addCat(e, id) {
                e.target.classList.toggle('active')
                this.$store.commit('RESET')
                this.$store.commit('ADD_CHECKEDCAT', id)
                this.$store.dispatch('GET_BOOKS')
                const catsString = this.checkCat.join()
                this.$router.replace({path: '/', query: {cat: catsString}})
            },
            addActiveClass(id) {
                if(this.checkCat.indexOf(id) >= 0) {
                    return 'active'
                }
            }
        },
        computed: {
            categories() {
                return this.$store.state.categories
            },
            checkCat() {
                return this.$store.state.checkedCat
            },
        },
        mounted() {
            this.$store.dispatch('GET_CATEGORIES')
        }
    }
</script>

<style lang="scss">
    .nav-tags {
        &__list {
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
        }
        &__item {
            margin: 5px 5px;
        }
        &__link {
            display: inline-flex;
            padding: 4px 10px;
            border: 1px solid var(--green);
            border-radius: 5px;
            color: var(--green);
            text-decoration: none;
            background: var(--white);
            transition: color .3s, background-color .3s, border-color .3s;
            &.active {
                color: var(--white);
                border-color: var(--red);
                background: var(--red);
            }
            &:hover {
                color: var(--white);
                border-color: var(--red);
                background: var(--red);
            }
        }
    }
</style>