import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { KeyWord, KeyWordDocument } from "./schemas/keyword.schema";
import { CreateKeyWordDto } from "./dto/create-keyword.dto";
import { PreWord, PreWordDocument } from "./schemas/preWord.schema";

export class KeyWordRepository {
    constructor(
        @InjectModel(KeyWord.name)
        private KeyWordModel: Model<KeyWordDocument>,
        @InjectModel(PreWord.name)
        private PreWordModel: Model<PreWordDocument>
    ) { }

    async saveKeyWord(createKeyWordDto: CreateKeyWordDto): Promise<KeyWord> {
        const keyWord = new this.KeyWordModel(createKeyWordDto);
        return keyWord.save();
    }

    async findKeyWord(): Promise<KeyWord[]> {
        return this.KeyWordModel.find();
    }

    async findRandom() {
        //키워드 DB에서 랜덤으로 1개 추출
        var keyword = await this.KeyWordModel.aggregate([{ $sample: { size: 1 } }])
        const totalKeyword = await this.KeyWordModel.count();
        const totalPreword = await this.PreWordModel.count();
        console.log(keyword[0].content)

        //추출된 키워드가 이전에 보여진 적 있는 지 이전 키워드 DB에서 확인
        var pre = await this.PreWordModel.findOne({ keywordId: keyword });
        console.log(pre)

        //이전 키워드가 존재하고 키워드DB와 이전DB 수가 다르면(키워드DB에 새 키워드가 있으면)
        if (pre && totalPreword != totalKeyword) {
            //이전 키워드 존재하는 동안 계속 키워드 추출
            while (pre) {
                var keyword = await this.KeyWordModel.aggregate([{ $sample: { size: 1 } }])
                var pre = await this.PreWordModel.findOne({ keywordId: keyword });
                console.log("var" + keyword[0].content);
            }
        }
        //키워드 DB 수랑 이전 키워드 수가 같으면
        else if (pre && totalPreword == totalKeyword) {
            return "모두 사용한 키워드";
        }
        console.log("var2" + keyword[0].content);

        //이전 키워드 없으면
        if (!pre) {
            console.log("pre" + keyword[0].content);
            //현재 키워드를 이전 키워드에 저장
            const preword = await new this.PreWordModel({
                keywordId: keyword[0],
                content: keyword[0].content
            });
            preword.save();
        }
        console.log("최종키워드" + keyword[0].content)
        return keyword;
    }
}