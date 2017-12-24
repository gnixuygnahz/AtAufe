import CourseService from './../../Service/CourseService';


export default class GuideCon {
    constructor(page) {
        this.page = page;
    }
    init() {
        const page=this.page;
        CourseService.getNowCourse((ret)=>{
            page.setCourses(ret);
        });
    }
}
