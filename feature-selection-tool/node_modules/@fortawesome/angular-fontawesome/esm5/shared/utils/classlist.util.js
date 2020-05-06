/**
 * Fontawesome class list.
 * Returns classes array by props.
 */
export var faClassList = function (props) {
    var _a;
    var classes = (_a = {
            'fa-spin': props.spin,
            'fa-pulse': props.pulse,
            'fa-fw': props.fixedWidth,
            'fa-border': props.border,
            'fa-inverse': props.inverse,
            'fa-layers-counter': props.counter,
            'fa-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
            'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both'
        },
        _a["fa-" + props.size] = props.size !== null,
        _a["fa-rotate-" + props.rotate] = props.rotate !== null,
        _a["fa-pull-" + props.pull] = props.pull !== null,
        _a["fa-stack-" + props.stackItemSize] = props.stackItemSize != null,
        _a);
    return Object.keys(classes)
        .map(function (key) { return (classes[key] ? key : null); })
        .filter(function (key) { return key; });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NsaXN0LnV0aWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZS8iLCJzb3VyY2VzIjpbInNoYXJlZC91dGlscy9jbGFzc2xpc3QudXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7O0dBR0c7QUFDSCxNQUFNLENBQUMsSUFBTSxXQUFXLEdBQUcsVUFBQyxLQUFjOztJQUN4QyxJQUFNLE9BQU87WUFDWCxTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUk7WUFDckIsVUFBVSxFQUFFLEtBQUssQ0FBQyxLQUFLO1lBQ3ZCLE9BQU8sRUFBRSxLQUFLLENBQUMsVUFBVTtZQUN6QixXQUFXLEVBQUUsS0FBSyxDQUFDLE1BQU07WUFDekIsWUFBWSxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQzNCLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ2xDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxJQUFJLEtBQUssWUFBWSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTTtZQUMxRSxrQkFBa0IsRUFBRSxLQUFLLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU07O1FBQ3RFLEdBQUMsUUFBTSxLQUFLLENBQUMsSUFBTSxJQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSTtRQUN6QyxHQUFDLGVBQWEsS0FBSyxDQUFDLE1BQVEsSUFBRyxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUk7UUFDcEQsR0FBQyxhQUFXLEtBQUssQ0FBQyxJQUFNLElBQUcsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJO1FBQzlDLEdBQUMsY0FBWSxLQUFLLENBQUMsYUFBZSxJQUFHLEtBQUssQ0FBQyxhQUFhLElBQUksSUFBSTtXQUNqRSxDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUN4QixHQUFHLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQztTQUN6QyxNQUFNLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmFQcm9wcyB9IGZyb20gJy4uL21vZGVscy9wcm9wcy5tb2RlbCc7XG5cbi8qKlxuICogRm9udGF3ZXNvbWUgY2xhc3MgbGlzdC5cbiAqIFJldHVybnMgY2xhc3NlcyBhcnJheSBieSBwcm9wcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGZhQ2xhc3NMaXN0ID0gKHByb3BzOiBGYVByb3BzKTogc3RyaW5nW10gPT4ge1xuICBjb25zdCBjbGFzc2VzID0ge1xuICAgICdmYS1zcGluJzogcHJvcHMuc3BpbixcbiAgICAnZmEtcHVsc2UnOiBwcm9wcy5wdWxzZSxcbiAgICAnZmEtZncnOiBwcm9wcy5maXhlZFdpZHRoLFxuICAgICdmYS1ib3JkZXInOiBwcm9wcy5ib3JkZXIsXG4gICAgJ2ZhLWludmVyc2UnOiBwcm9wcy5pbnZlcnNlLFxuICAgICdmYS1sYXllcnMtY291bnRlcic6IHByb3BzLmNvdW50ZXIsXG4gICAgJ2ZhLWZsaXAtaG9yaXpvbnRhbCc6IHByb3BzLmZsaXAgPT09ICdob3Jpem9udGFsJyB8fCBwcm9wcy5mbGlwID09PSAnYm90aCcsXG4gICAgJ2ZhLWZsaXAtdmVydGljYWwnOiBwcm9wcy5mbGlwID09PSAndmVydGljYWwnIHx8IHByb3BzLmZsaXAgPT09ICdib3RoJyxcbiAgICBbYGZhLSR7cHJvcHMuc2l6ZX1gXTogcHJvcHMuc2l6ZSAhPT0gbnVsbCxcbiAgICBbYGZhLXJvdGF0ZS0ke3Byb3BzLnJvdGF0ZX1gXTogcHJvcHMucm90YXRlICE9PSBudWxsLFxuICAgIFtgZmEtcHVsbC0ke3Byb3BzLnB1bGx9YF06IHByb3BzLnB1bGwgIT09IG51bGwsXG4gICAgW2BmYS1zdGFjay0ke3Byb3BzLnN0YWNrSXRlbVNpemV9YF06IHByb3BzLnN0YWNrSXRlbVNpemUgIT0gbnVsbCxcbiAgfTtcblxuICByZXR1cm4gT2JqZWN0LmtleXMoY2xhc3NlcylcbiAgICAubWFwKChrZXkpID0+IChjbGFzc2VzW2tleV0gPyBrZXkgOiBudWxsKSlcbiAgICAuZmlsdGVyKChrZXkpID0+IGtleSk7XG59O1xuIl19