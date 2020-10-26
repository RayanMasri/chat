const socket = io();
var username = '';
var color = ['#007991', '#BCD3F2', '#A2A77F', '#986C6A'][
    Math.floor(Math.random() * 4)
];

$('.chat').click((event) => {
    if (event.target != $('.chat-panel')[0]) return;
    $('.chat-input').focus();
});

$('.chat-input').keydown((event) => {
    if (event.which != 13) return;

    if ($('<div/>').text($('.chat-input').val()).html()) {
        socket.emit('chat.message', {
            message: $('<div/>').text($('.chat-input').val()).html(),
            name: username,
            color: color,
        });
        $('.chat-input').val('');
    }
});

socket.on('chat.message', (object) => {
    $('.chat-data').append(
        $(`                
        <div class="chat-message">
            <div class="chat-message-sender">
                <div class="chat-message-sender-name">
                    ${object.name}
                </div>
                <div class="chat-message-sender-id">
                    ${object.id}
                </div>
            </div>
            <div>:</div>
            <div class="chat-message-content">${object.message}</div>
        </div>
        `)
            .mouseenter(function () {
                $(this)
                    .find('.chat-message-sender-id')
                    .show('slide', { direction: 'left' }, 100);
            })
            .mouseleave(function () {
                $(this)
                    .find('.chat-message-sender-id')
                    .hide('slide', { direction: 'left' }, 100);
            })
            .css('color', object.color)
    );
});

$('.chat').hide();
$('.login')
    .show()
    .click(() => {
        $('.username').focus();
    });
$('.username').focus();
$('.username')
    .focus()
    .keydown((event) => {
        if (event.which != 13) return;
        if (!$('.username').val()) {
            $.getJSON('names.json', (json) => {
                username = json.names[
                    Math.floor(Math.random() * json.names.length)
                ].toLowerCase();

                $('.login').hide();
                $('.chat').show();
                $('.chat-input').focus();
            });
        }
        username = $('<div/>').text($('.username').val()).html();

        $('.login').hide();
        $('.chat').show();
        $('.chat-input').focus();
    });
