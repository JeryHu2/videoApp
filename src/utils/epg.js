export const epgMethods = {
    left() {
        this.$service.move("left");
    },
    right() {
        this.$service.move("right");
    },
    up() {
        this.$service.move("up");
        this.$service.pointer.$el.scrollIntoView(true);
    },
    down() {
        this.$service.move("down");
        this.$service.pointer.$el.scrollIntoView(true);
    }
}