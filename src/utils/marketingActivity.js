export default class MarketingActivity {
    static getActivityText(marketing_activity){
        switch (marketing_activity) {
            case 0:
                return ''
                break
            case 1:
                return '拼团'
            case 2:
                return '秒杀'
            case 3:
                return '赠品'
        }
    }
}
