<script>
  export let image;
</script>

<img src={image} alt="Quiz Question" class="image" />
<!-- <p>{image}</p> -->

<style>
  .image {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: all 0.2s;
    border-radius: 15px;
  }
</style>
