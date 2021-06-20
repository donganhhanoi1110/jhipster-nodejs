/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { UserDTO } from './user.dto';

/**
 * A Book DTO object.
 */
export class BookDTO extends BaseDTO {
    @IsNotEmpty()
    @MaxLength(150)
    @ApiModelProperty({ description: 'title field' })
    title: string;

    @ApiModelProperty({ description: 'author field', required: false })
    author: string;

    @ApiModelProperty({ description: 'year field', required: false })
    year: string;

    @ApiModelProperty({ type: UserDTO, description: 'manyUserToOneBook relationship' })
    manyUserToOneBook: UserDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
