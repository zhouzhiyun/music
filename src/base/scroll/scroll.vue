<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	export default {
		props:{
			probeType: { // 快速和缓慢执行
				type:Number,
				default: 1
			},
			click:{ //是否手动派发事件
				type: Boolean,
				default: true
			},
			data: {
				type: Array,
				default: null
			},
			listenScroll: {
				type: Boolean,//是否监听滚动
				default: false
			},
			pullup:{
				type:Boolean,
				default:false
			}
		},
		mounted(){
			setTimeout(() => {
				this._initScroll();
			},20)
		},
		methods:{
			_initScroll(){
				if(!this.$refs.wrapper){
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper,{
					probeType: this.probeType,
					click: this.click
				})
				if(this.listenScroll){
					let me = this;
					this.scroll.on('scroll', (pos) => {
						me.$emit('scroll', pos)
					})
				}
				if(this.pullup){
					this.scroll.on('scrollEnd',()=>{ //滚动结束
						if(this.scroll.y <= this.scroll.maxScrollY + 50){
							this.$emit('scrollToEnd')//滚动到底部
						}
					});
				}
			},
			enable() {
				this.scroll && this.scroll.enable()
			},
			disable() {
				this.scroll && this.scroll.disable()
			},
			refresh() {
				this.scroll && this.scroll.refresh()
			},
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			scrollToElement() {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			}
		},
		watch:{
			data(){
				setTimeout(() => {
					this._initScroll()
				},20)
			}
		}

	};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>