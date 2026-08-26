import { onMounted, onUnmounted, type Ref } from 'vue'

export function useReveal() {
  let observer: IntersectionObserver | null = null

  const observe = (el: Element | null) => {
    if (!el) return
    if (observer) observer.observe(el)
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    document.querySelectorAll('.reveal').forEach((el) => observer?.observe(el))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { observe }
}

export type RevealFn = ReturnType<typeof useReveal>

export function refReveal(): Ref<Element | null> {
  return null as unknown as Ref<Element | null>
}
