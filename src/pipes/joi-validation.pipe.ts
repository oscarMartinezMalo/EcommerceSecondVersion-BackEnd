import { Injectable, BadRequestException, ArgumentMetadata, PipeTransform } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema) { }

    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type !== 'body') return value; // Validate only the body

        const { error } = this.schema.validate(value);
        if (error) { throw new BadRequestException(error.message); }
        return value;
    }
}
