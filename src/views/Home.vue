<template>
    <div>
        <Categories></Categories>
        <BookList></BookList>
    </div>
</template>

<script>
    import Categories from '../components/Categories';
    import BookList from '../components/Book-list';
    export default {
        name: 'Home',
        components: {BookList, Categories},
        comments: {
            Categories,
            BookList
        }
    }
</script>

<style scoped>

</style>