/* ===================================================
 * bootstrap-transition.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);/* ==========================================================
 * bootstrap-alert.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);/* ============================================================
 * bootstrap-button.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
  })

}(window.jQuery);/* ==========================================================
 * bootstrap-carousel.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.options = options
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , to: function (pos) {
      var $active = this.$element.find('.item.active')
        , children = $active.parent().children()
        , activePos = children.index($active)
        , that = this

      if (pos > (children.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activePos == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle()
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      e = $.Event('slide', {
        relatedTarget: $next[0]
      })

      if ($next.hasClass('active')) return

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  $(document).on('click.carousel.data-api', '[data-slide]', function (e) {
    var $this = $(this), href
      , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      , options = $.extend({}, $target.data(), $this.data())
    $target.carousel(options)
    e.preventDefault()
  })

}(window.jQuery);/* =============================================================
 * bootstrap-collapse.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) return $this.click()

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)
    $parent.length || ($parent = $this.parent())

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api touchstart.dropdown.data-api', clearMenus)
    .on('click.dropdown touchstart.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('touchstart.dropdown.data-api', '.dropdown-menu', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api touchstart.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api touchstart.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);/* =========================================================
 * bootstrap-modal.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function (that) {
        this.$element
          .hide()
          .trigger('hidden')

        this.backdrop()
      }

    , removeBackdrop: function () {
        this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
            this.removeBackdrop()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);
/* ===========================================================
 * bootstrap-tooltip.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (this.options.trigger != 'manual') {
        eventIn = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })
          .insertAfter(this.$element)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .offset(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)
      self[self.tip().hasClass('in') ? 'hide' : 'show']()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover'
  , title: ''
  , delay: 0
  , html: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);/* ===========================================================
 * bootstrap-popover.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);/* =============================================================
 * bootstrap-scrollspy.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top + self.$scrollElement.scrollTop(), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);/* ========================================================
 * bootstrap-tab.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);/* =============================================================
 * bootstrap-typeahead.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.$menu = $(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this)
    if ($this.data('typeahead')) return
    e.preventDefault()
    $this.typeahead($this.data())
  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-affix.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);

(function(a){function n(h,j){function e(e){return a.isArray(g.readonly)?(e=a(".dwwl",t).index(e),g.readonly[e]):g.readonly}function y(a){var e="",h;for(h in S[a])e+='<li class="dw-v" data-val="'+h+'" style="height:'+H+"px;line-height:"+H+'px;"><div class="dw-i">'+S[a][h]+"</div></li>";return e}function q(){var a=document.body,e=document.documentElement;return Math.max(a.scrollHeight,a.offsetHeight,e.clientHeight,e.scrollHeight,e.offsetHeight)}function l(e){d=a("li.dw-v",e).eq(0).index();c=a("li.dw-v",
e).eq(-1).index();z=a("ul",t).index(e);m=H;p=k}function u(a){var e=g.headerText;return e?"function"==typeof e?e.call(L,a):e.replace(/\{value\}/i,a):""}function n(){k.temp=O&&(null!==k.val&&k.val!=B.val()||!B.val().length)||null===k.values?g.parseValue(B.val()||"",k):k.values.slice(0);k.setValue(!0)}function v(e,h,g,d){K("validate",[t,h]);a(".dww ul",t).each(function(g){var y=a(this),b=a('li[data-val="'+k.temp[g]+'"]',y),c=b.index(),j=g==h||void 0===h;if(!b.hasClass("dw-v")){for(var f=b,i=0,o=0;f.prev().length&&
!f.hasClass("dw-v");)f=f.prev(),i++;for(;b.next().length&&!b.hasClass("dw-v");)b=b.next(),o++;(o<i&&o&&2!==d||!i||!f.hasClass("dw-v")||1==d)&&b.hasClass("dw-v")?c+=o:(b=f,c-=i)}if(!b.hasClass("dw-sel")||j)k.temp[g]=b.attr("data-val"),a(".dw-sel",y).removeClass("dw-sel"),b.addClass("dw-sel"),k.scroll(y,g,c,e)});k.change(g)}function W(){function e(){a(".dwc",t).each(function(){k=a(this).outerWidth(!0);h+=k;b=k>b?k:b});k=h>y?b:h;k=a(".dwwr",t).width(k+1).outerWidth();o=j.outerHeight()}if("inline"!=g.display){var h=
0,b=0,y=a(window).width(),d=window.innerHeight,c=a(window).scrollTop(),j=a(".dw",t),k,f,i,o,m,p={},F,r=void 0===g.anchor?B:g.anchor,d=d||a(window).height();if("modal"==g.display)e(),i=(y-k)/2,f=c+(d-o)/2;else if("bubble"==g.display){e();var l=r.offset(),D=a(".dw-arr",t),u=a(".dw-arrw-i",t),n=j.outerWidth();m=r.outerWidth();i=l.left-(j.outerWidth(!0)-m)/2;i=i>y-n?y-(n+20):i;i=0<=i?i:20;f=l.top-(j.outerHeight()+3);f<c||l.top>c+d?(j.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"),f=l.top+r.outerHeight()+
3,F=f+j.outerHeight(!0)>c+d||l.top>c+d):j.removeClass("dw-bubble-bottom").addClass("dw-bubble-top");f=f>=c?f:c;c=l.left+m/2-(i+(n-u.outerWidth())/2);c>u.outerWidth()&&(c=u.outerWidth());D.css({left:c})}else p.width="100%","top"==g.display?f=c:"bottom"==g.display&&(f=c+d-j.outerHeight(),f=0<=f?f:0);p.top=f;p.left=i;j.css(p);a(".dwo, .dw-persp",t).height(0).height(q());F&&a(window).scrollTop(f+j.outerHeight(!0)-d)}}function K(e,h){var b;h.push(k);a.each([T,j],function(a,c){c[e]&&(b=c[e].apply(L,h))});
return b}function x(e){var a=+e.data("pos")+1;f(e,a>c?d:a,1)}function Z(e){var a=+e.data("pos")-1;f(e,a<d?c:a,2)}var k=this,X=a.mobiscroll,L=h,B=a(L),Y,$,g=E({},J),T={},aa,H,F,t,S=[],P={},O=B.is("input"),Q=!1;k.enable=function(){g.disabled=!1;O&&B.prop("disabled",!1)};k.disable=function(){g.disabled=!0;O&&B.prop("disabled",!0)};k.scroll=function(e,a,h,b,c,g){function d(){clearInterval(P[a]);P[a]=void 0;e.data("pos",h).closest(".dwwl").removeClass("dwa")}var y=(aa-h)*H,j,g=g||C;e.attr("style",(b?N+
"-transition:all "+b.toFixed(1)+"s ease-out;":"")+(R?N+"-transform:translate3d(0,"+y+"px,0);":"top:"+y+"px;"));P[a]&&d();b&&void 0!==c?(j=0,e.closest(".dwwl").addClass("dwa"),P[a]=setInterval(function(){j+=0.1;e.data("pos",Math.round((h-c)*Math.sin(j/b*(Math.PI/2))+c));j>=b&&(d(),g())},100),K("onAnimStart",[a,b])):(e.data("pos",h),g())};k.setValue=function(e,a,h,b){b||(k.values=k.temp.slice(0));Q&&e&&v(h);a&&(F=g.formatResult(k.temp),k.val=F,O&&B.val(F).trigger("change"))};k.validate=function(e,a){v(0.2,
e,!0,a)};k.change=function(e){F=g.formatResult(k.temp);"inline"==g.display?k.setValue(!1,e):a(".dwv",t).html(u(F));e&&K("onChange",[F])};k.hide=function(e){if(!1===K("onClose",[F]))return!1;a(".dwtd").prop("disabled",!1).removeClass("dwtd");B.blur();t&&("inline"!=g.display&&g.animate&&!e?(a(".dw",t).addClass("dw-"+g.animate+" dw-out"),setTimeout(function(){t.remove();t=null},350)):(t.remove(),t=null),Q=!1,a(window).unbind(".dw"))};k.changeWheel=function(e,h){if(t){var b=0,c,d,j=e.length;for(c in g.wheels)for(d in g.wheels[c]){if(-1<
a.inArray(b,e)&&(S[b]=g.wheels[c][d],a("ul",t).eq(b).html(y(b)),j--,!j)){W();v(h);return}b++}}};k.show=function(h){if(g.disabled||Q)return!1;"top"==g.display&&(g.animate="slidedown");"bottom"==g.display&&(g.animate="slideup");n();K("onBeforeShow",[t]);var c=0,d,j="",m="",p="";g.animate&&!h&&(m='<div class="dw-persp">',p="</div>",j="dw-"+g.animate+" dw-in");j='<div class="'+g.theme+" dw-"+g.display+'">'+("inline"==g.display?'<div class="dw dwbg dwi"><div class="dwwr">':m+'<div class="dwo"></div><div class="dw dwbg '+
j+'"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr">'+(g.headerText?'<div class="dwv"></div>':""));for(h=0;h<g.wheels.length;h++){j+='<div class="dwc'+("scroller"!=g.mode?" dwpm":" dwsc")+(g.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';for(d in g.wheels[h])S[c]=g.wheels[h][d],j+='<td><div class="dwwl dwrc dwwl'+c+'">'+("scroller"!=g.mode?'<div class="dwwb dwwbp" style="height:'+H+"px;line-height:"+
H+'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:'+H+"px;line-height:"+H+'px;"><span>&ndash;</span></div>':"")+'<div class="dwl">'+d+'</div><div class="dww dwrc" style="height:'+g.rows*H+"px;min-width:"+g.width+'px;"><ul>',j+=y(c),j+='</ul><div class="dwwo"></div></div><div class="dwwol"></div></div></td>',c++;j+="</tr></table></div></div>"}j+=("inline"!=g.display?'<div class="dwbc'+(g.button3?" dwbc-p":"")+'"><span class="dwbw dwb-s"><span class="dwb">'+g.setText+"</span></span>"+
(g.button3?'<span class="dwbw dwb-n"><span class="dwb">'+g.button3Text+"</span></span>":"")+'<span class="dwbw dwb-c"><span class="dwb">'+g.cancelText+"</span></span></div>"+p:'<div class="dwcc"></div>')+"</div></div></div>";t=a(j);v();"inline"!=g.display?t.appendTo("body"):B.is("div")?B.html(t):t.insertAfter(B);Q=!0;"inline"!=g.display&&(a(".dwb-s span",t).click(function(){if(k.hide()!==false){k.setValue(false,true);K("onSelect",[k.val])}return false}),a(".dwb-c span",t).click(function(){k.hide()!==
false&&K("onCancel",[k.val]);return false}),g.button3&&a(".dwb-n span",t).click(g.button3),g.scrollLock&&t.bind("touchmove",function(e){e.preventDefault()}),a("input,select").each(function(){a(this).prop("disabled")||a(this).addClass("dwtd")}),a("input,select").prop("disabled",!0),W(),a(window).bind("resize.dw",W));t.delegate(".dwwl","DOMMouseScroll mousewheel",function(h){if(!e(this)){h.preventDefault();var h=h.originalEvent,h=h.wheelDelta?h.wheelDelta/120:h.detail?-h.detail/3:0,b=a("ul",this),c=
+b.data("pos"),c=Math.round(c-h);l(b);f(b,c,h<0?1:2)}}).delegate(".dwb, .dwwb",M,function(){a(this).addClass("dwb-a")}).delegate(".dwwb",M,function(h){var c=a(this).closest(".dwwl");if(!e(c)&&!c.hasClass("dwa")){h.preventDefault();h.stopPropagation();var j=c.find("ul"),d=a(this).hasClass("dwwbp")?x:Z;b=true;l(j);clearInterval(i);i=setInterval(function(){d(j)},g.delay);d(j)}}).delegate(".dwwl",M,function(h){h.preventDefault();if(!o&&!e(this)&&!b&&g.mode!="clickpick"){o=true;r=a("ul",this);r.closest(".dwwl").addClass("dwa");
D=+r.data("pos");l(r);I=P[z]!==void 0;A=w(h);U=new Date;s=A;k.scroll(r,z,D)}});K("onShow",[t,F]);Y.init(t,k)};k.init=function(e){Y=E({defaults:{},init:C},X.themes[e.theme||g.theme]);$=X.i18n[e.lang||g.lang];E(j,e);E(g,Y.defaults,$,j);k.settings=g;B.unbind(".dw");if(e=X.presets[g.preset])T=e.call(L,k),E(g,T,j),E(G,T.methods);aa=Math.floor(g.rows/2);H=g.height;void 0!==B.data("dwro")&&(L.readOnly=V(B.data("dwro")));Q&&k.hide();"inline"==g.display?k.show():(n(),O&&g.showOnFocus&&(B.data("dwro",L.readOnly),
L.readOnly=!0,B.bind("focus.dw",function(){k.show()})))};k.values=null;k.val=null;k.temp=null;k.init(j)}function x(h){for(var a in h)if(void 0!==Z[h[a]])return!0;return!1}function w(h){var a=h.originalEvent,e=h.changedTouches;return e||a&&a.changedTouches?a?a.changedTouches[0].pageY:e[0].pageY:h.pageY}function V(a){return!0===a||"true"==a}function u(a,c,e){a=a>e?e:a;return a<c?c:a}function f(h,b,e,y,f){var b=u(b,d,c),i=a("li",h).eq(b),o=z,y=y?b==f?0.1:Math.abs(0.1*(b-f)):0;p.scroll(h,o,b,y,f,function(){p.temp[o]=
i.attr("data-val");p.validate(o,e)})}function l(a,b,e){return G[b]?G[b].apply(a,Array.prototype.slice.call(e,1)):"object"===typeof b?G.init.call(a,b):a}var q={},i,C=function(){},m,d,c,p,v=(new Date).getTime(),o,b,r,z,A,s,U,D,I,Z=document.createElement("modernizr").style,R=x(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]),N=function(){var a=["Webkit","Moz","O","ms"],b;for(b in a)if(x([a[b]+"Transform"]))return"-"+a[b].toLowerCase();return""}(),E=a.extend,
M="touchstart mousedown",J={width:70,height:40,rows:3,delay:300,disabled:!1,readonly:!1,showOnFocus:!0,showLabel:!0,wheels:[],theme:"",headerText:"{value}",display:"modal",mode:"scroller",preset:"",lang:"en-US",setText:"Set",cancelText:"Cancel",scrollLock:!0,formatResult:function(a){return a.join(" ")},parseValue:function(a,b){var e=b.settings.wheels,c=a.split(" "),d=[],f=0,i,o,m;for(i=0;i<e.length;i++)for(o in e[i]){if(void 0!==e[i][o][c[f]])d.push(c[f]);else for(m in e[i][o]){d.push(m);break}f++}return d}},
G={init:function(a){void 0===a&&(a={});return this.each(function(){this.id||(v+=1,this.id="scoller"+v);q[this.id]=new n(this,a)})},enable:function(){return this.each(function(){var a=q[this.id];a&&a.enable()})},disable:function(){return this.each(function(){var a=q[this.id];a&&a.disable()})},isDisabled:function(){var a=q[this[0].id];if(a)return a.settings.disabled},option:function(a,b){return this.each(function(){var e=q[this.id];if(e){var c={};"object"===typeof a?c=a:c[a]=b;e.init(c)}})},setValue:function(a,
b,e,c){return this.each(function(){var d=q[this.id];d&&(d.temp=a,d.setValue(!0,b,e,c))})},getInst:function(){return q[this[0].id]},getValue:function(){var a=q[this[0].id];if(a)return a.values},show:function(){var a=q[this[0].id];if(a)return a.show()},hide:function(){return this.each(function(){var a=q[this.id];a&&a.hide()})},destroy:function(){return this.each(function(){var b=q[this.id];b&&(b.hide(),a(this).unbind(".dw"),delete q[this.id],a(this).is("input")&&(this.readOnly=V(a(this).data("dwro"))))})}};
a(document).bind("touchmove mousemove",function(a){o&&(a.preventDefault(),s=w(a),p.scroll(r,z,u(D+(A-s)/m,d-1,c+1)),I=!0)});a(document).bind("touchend mouseup",function(h){if(o){h.preventDefault();var j=new Date-U,h=u(D+(A-s)/m,d-1,c+1),e;e=r.offset().top;300>j?(j=(s-A)/j,j=j*j/0.0012,0>s-A&&(j=-j)):j=s-A;if(!j&&!I){e=Math.floor((s-e)/m);var y=a("li",r).eq(e);y.addClass("dw-hl");setTimeout(function(){y.removeClass("dw-hl")},200)}else e=Math.round(D-j/m);f(r,e,0,!0,Math.round(h));o=!1;r=null}b&&(clearInterval(i),
b=!1);a(".dwb-a").removeClass("dwb-a")});a.fn.mobiscroll=function(b){E(this,a.mobiscroll.shorts);return l(this,b,arguments)};a.mobiscroll=a.mobiscroll||{setDefaults:function(a){E(J,a)},presetShort:function(a){this.shorts[a]=function(b){return l(this,E(b,{preset:a}),arguments)}},shorts:{},presets:{},themes:{},i18n:{}};a.scroller=a.scroller||a.mobiscroll;a.fn.scroller=a.fn.scroller||a.fn.mobiscroll})(jQuery);(function(a){var n=a.mobiscroll,x=new Date,w={dateFormat:"mm/dd/yy",dateOrder:"mmddy",timeWheels:"hhiiA",timeFormat:"hh:ii A",startYear:x.getFullYear()-100,endYear:x.getFullYear()+1,monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
shortYearCutoff:"+10",monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",nowText:"Now",showNow:!1,stepHour:1,stepMinute:1,stepSecond:1,separator:" "},V=function(u){function f(a,b,c){return void 0!==o[b]?+a[o[b]]:void 0!==c?c:R[r[b]]?R[r[b]]():r[b](R)}function l(a,b){return Math.floor(a/b)*b}function q(a){var b=f(a,"h",0);return new Date(f(a,"y"),f(a,"m"),f(a,"d",1),f(a,"ap")?b+12:b,f(a,"i",0),f(a,"s",0))}var i=a(this),C={},m;if(i.is("input")){switch(i.attr("type")){case "date":m=
"yy-mm-dd";break;case "datetime":m="yy-mm-ddTHH:ii:ssZ";break;case "datetime-local":m="yy-mm-ddTHH:ii:ss";break;case "month":m="yy-mm";C.dateOrder="mmyy";break;case "time":m="HH:ii:ss"}var d=i.attr("min"),i=i.attr("max");d&&(C.minDate=n.parseDate(m,d));i&&(C.maxDate=n.parseDate(m,i))}var c=a.extend({},w,C,u.settings),p=0,C=[],v=[],o={},b,r={y:"getFullYear",m:"getMonth",d:"getDate",h:function(a){a=a.getHours();a=I&&12<=a?a-12:a;return l(a,N)},i:function(a){return l(a.getMinutes(),E)},s:function(a){return l(a.getSeconds(),
M)},ap:function(a){return D&&11<a.getHours()?1:0}},z=c.preset,A=c.dateOrder,s=c.timeWheels,U=A.match(/D/),D=s.match(/a/i),I=s.match(/h/),x="datetime"==z?c.dateFormat+c.separator+c.timeFormat:"time"==z?c.timeFormat:c.dateFormat,R=new Date,N=c.stepHour,E=c.stepMinute,M=c.stepSecond,J=c.minDate||new Date(c.startYear,0,1),G=c.maxDate||new Date(c.endYear,11,31,23,59,59);m=m||x;if(z.match(/date/i)){a.each(["y","m","d"],function(a,c){b=A.search(RegExp(c,"i"));-1<b&&v.push({o:b,v:c})});v.sort(function(a,
b){return a.o>b.o?1:-1});a.each(v,function(a,b){o[b.v]=a});d={};for(i=0;3>i;i++)if(i==o.y){p++;d[c.yearText]={};var h=J.getFullYear(),j=G.getFullYear();for(b=h;b<=j;b++)d[c.yearText][b]=A.match(/yy/i)?b:(b+"").substr(2,2)}else if(i==o.m){p++;d[c.monthText]={};for(b=0;12>b;b++)h=A.replace(/[dy]/gi,"").replace(/mm/,9>b?"0"+(b+1):b+1).replace(/m/,b),d[c.monthText][b]=h.match(/MM/)?h.replace(/MM/,'<span class="dw-mon">'+c.monthNames[b]+"</span>"):h.replace(/M/,'<span class="dw-mon">'+c.monthNamesShort[b]+
"</span>")}else if(i==o.d){p++;d[c.dayText]={};for(b=1;32>b;b++)d[c.dayText][b]=A.match(/dd/i)&&10>b?"0"+b:b}C.push(d)}if(z.match(/time/i)){v=[];a.each(["h","i","s"],function(a,b){a=s.search(RegExp(b,"i"));-1<a&&v.push({o:a,v:b})});v.sort(function(a,b){return a.o>b.o?1:-1});a.each(v,function(a,b){o[b.v]=p+a});d={};for(i=p;i<p+3;i++)if(i==o.h){p++;d[c.hourText]={};for(b=0;b<(I?12:24);b+=N)d[c.hourText][b]=I&&0==b?12:s.match(/hh/i)&&10>b?"0"+b:b}else if(i==o.i){p++;d[c.minuteText]={};for(b=0;60>b;b+=
E)d[c.minuteText][b]=s.match(/ii/)&&10>b?"0"+b:b}else if(i==o.s){p++;d[c.secText]={};for(b=0;60>b;b+=M)d[c.secText][b]=s.match(/ss/)&&10>b?"0"+b:b}D&&(o.ap=p++,i=s.match(/A/),d[c.ampmText]={"0":i?"AM":"am",1:i?"PM":"pm"});C.push(d)}u.setDate=function(a,b,c,d){for(var f in o)this.temp[o[f]]=a[r[f]]?a[r[f]]():r[f](a);this.setValue(!0,b,c,d)};u.getDate=function(a){return q(a)};return{button3Text:c.showNow?c.nowText:void 0,button3:c.showNow?function(){u.setDate(new Date,!1,0.3,!0)}:void 0,wheels:C,headerText:function(){return n.formatDate(x,
q(u.temp),c)},formatResult:function(a){return n.formatDate(m,q(a),c)},parseValue:function(a){var b=new Date,d,f=[];try{b=n.parseDate(m,a,c)}catch(h){}for(d in o)f[o[d]]=b[r[d]]?b[r[d]]():r[d](b);return f},validate:function(b){var d=u.temp,h={y:J.getFullYear(),m:0,d:1,h:0,i:0,s:0,ap:0},i={y:G.getFullYear(),m:11,d:31,h:l(I?11:23,N),i:l(59,E),s:l(59,M),ap:1},j=!0,m=!0;a.each("y,m,d,ap,h,i,s".split(","),function(p,l){if(o[l]!==void 0){var q=h[l],u=i[l],D=31,k=f(d,l),n=a("ul",b).eq(o[l]),s,v;if(l=="d"){s=
f(d,"y");v=f(d,"m");u=D=32-(new Date(s,v,32)).getDate();U&&a("li",n).each(function(){var b=a(this),d=b.data("val"),e=(new Date(s,v,d)).getDay(),d=A.replace(/[my]/gi,"").replace(/dd/,d<10?"0"+d:d).replace(/d/,d);a(".dw-i",b).html(d.match(/DD/)?d.replace(/DD/,'<span class="dw-day">'+c.dayNames[e]+"</span>"):d.replace(/D/,'<span class="dw-day">'+c.dayNamesShort[e]+"</span>"))})}j&&J&&(q=J[r[l]]?J[r[l]]():r[l](J));m&&G&&(u=G[r[l]]?G[r[l]]():r[l](G));if(l!="y"){var z=a('li[data-val="'+q+'"]',n).index(),
C=a('li[data-val="'+u+'"]',n).index();a("li",n).removeClass("dw-v").slice(z,C+1).addClass("dw-v");l=="d"&&a("li",n).removeClass("dw-h").slice(D).addClass("dw-h")}k<q&&(k=q);k>u&&(k=u);j&&(j=k==q);m&&(m=k==u);if(c.invalid&&l=="d"){var g=[];c.invalid.dates&&a.each(c.invalid.dates,function(a,b){b.getFullYear()==s&&b.getMonth()==v&&g.push(b.getDate()-1)});if(c.invalid.daysOfWeek){var I=(new Date(s,v,1)).getDay(),w;a.each(c.invalid.daysOfWeek,function(a,b){for(w=b-I;w<D;w=w+7)w>=0&&g.push(w)})}c.invalid.daysOfMonth&&
a.each(c.invalid.daysOfMonth,function(a,b){b=(b+"").split("/");b[1]?b[0]-1==v&&g.push(b[1]-1):g.push(b[0]-1)});a.each(g,function(b,c){a("li",n).eq(c).removeClass("dw-v")})}d[o[l]]=k}})},methods:{getDate:function(b){var c=a(this).mobiscroll("getInst");if(c)return c.getDate(b?c.temp:c.values)},setDate:function(b,c,d,f){void 0==c&&(c=!1);return this.each(function(){var h=a(this).mobiscroll("getInst");h&&h.setDate(b,c,d,f)})}}}};a.each(["date","time","datetime"],function(a,f){n.presets[f]=V;n.presetShort(f)});
n.formatDate=function(u,f,l){if(!f)return null;var l=a.extend({},w,l),q=function(a){for(var c=0;m+1<u.length&&u.charAt(m+1)==a;)c++,m++;return c},i=function(a,c,b){c=""+c;if(q(a))for(;c.length<b;)c="0"+c;return c},n=function(a,c,b,d){return q(a)?d[c]:b[c]},m,d="",c=!1;for(m=0;m<u.length;m++)if(c)"'"==u.charAt(m)&&!q("'")?c=!1:d+=u.charAt(m);else switch(u.charAt(m)){case "d":d+=i("d",f.getDate(),2);break;case "D":d+=n("D",f.getDay(),l.dayNamesShort,l.dayNames);break;case "o":d+=i("o",(f.getTime()-
(new Date(f.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":d+=i("m",f.getMonth()+1,2);break;case "M":d+=n("M",f.getMonth(),l.monthNamesShort,l.monthNames);break;case "y":d+=q("y")?f.getFullYear():(10>f.getYear()%100?"0":"")+f.getYear()%100;break;case "h":var p=f.getHours(),d=d+i("h",12<p?p-12:0==p?12:p,2);break;case "H":d+=i("H",f.getHours(),2);break;case "i":d+=i("i",f.getMinutes(),2);break;case "s":d+=i("s",f.getSeconds(),2);break;case "a":d+=11<f.getHours()?"pm":"am";break;case "A":d+=
11<f.getHours()?"PM":"AM";break;case "'":q("'")?d+="'":c=!0;break;default:d+=u.charAt(m)}return d};n.parseDate=function(n,f,l){var q=new Date;if(!n||!f)return q;var f="object"==typeof f?f.toString():f+"",i=a.extend({},w,l),C=i.shortYearCutoff,l=q.getFullYear(),m=q.getMonth()+1,d=q.getDate(),c=-1,p=q.getHours(),q=q.getMinutes(),v=0,o=-1,b=!1,r=function(a){(a=x+1<n.length&&n.charAt(x+1)==a)&&x++;return a},z=function(a){r(a);a=f.substr(s).match(RegExp("^\\d{1,"+("@"==a?14:"!"==a?20:"y"==a?4:"o"==a?3:
2)+"}"));if(!a)return 0;s+=a[0].length;return parseInt(a[0],10)},A=function(a,b,c){a=r(a)?c:b;for(b=0;b<a.length;b++)if(f.substr(s,a[b].length).toLowerCase()==a[b].toLowerCase())return s+=a[b].length,b+1;return 0},s=0,x;for(x=0;x<n.length;x++)if(b)"'"==n.charAt(x)&&!r("'")?b=!1:s++;else switch(n.charAt(x)){case "d":d=z("d");break;case "D":A("D",i.dayNamesShort,i.dayNames);break;case "o":c=z("o");break;case "m":m=z("m");break;case "M":m=A("M",i.monthNamesShort,i.monthNames);break;case "y":l=z("y");
break;case "H":p=z("H");break;case "h":p=z("h");break;case "i":q=z("i");break;case "s":v=z("s");break;case "a":o=A("a",["am","pm"],["am","pm"])-1;break;case "A":o=A("A",["am","pm"],["am","pm"])-1;break;case "'":r("'")?s++:b=!0;break;default:s++}100>l&&(l+=(new Date).getFullYear()-(new Date).getFullYear()%100+(l<=("string"!=typeof C?C:(new Date).getFullYear()%100+parseInt(C,10))?0:-100));if(-1<c){m=1;d=c;do{i=32-(new Date(l,m-1,32)).getDate();if(d<=i)break;m++;d-=i}while(1)}p=new Date(l,m-1,d,-1==
o?p:o&&12>p?p+12:!o&&12==p?0:p,q,v);if(p.getFullYear()!=l||p.getMonth()+1!=m||p.getDate()!=d)throw"Invalid date";return p}})(jQuery);(function(a){a.mobiscroll.themes.jqm={defaults:{jqmBody:"c",jqmHeader:"b",jqmWheel:"d",jqmClickPick:"c",jqmSet:"b",jqmCancel:"c"},init:function(n,x){var w=x.settings;a(".dw",n).removeClass("dwbg").addClass("ui-overlay-shadow ui-corner-all ui-body-a");a(".dwb-s span",n).attr("data-role","button").attr("data-theme",w.jqmSet);a(".dwb-n span",n).attr("data-role","button").attr("data-theme",w.jqmCancel);a(".dwb-c span",n).attr("data-role","button").attr("data-theme",w.jqmCancel);a(".dwwb",n).attr("data-role",
"button").attr("data-theme",w.jqmClickPick);a(".dwv",n).addClass("ui-header ui-bar-"+w.jqmHeader);a(".dwwr",n).addClass("ui-body-"+w.jqmBody);a(".dwpm .dww",n).addClass("ui-body-"+w.jqmWheel);"inline"!=w.display&&a(".dw",n).addClass("pop in");n.trigger("create");a(".dwo",n).click(function(){x.hide()})}}})(jQuery);

