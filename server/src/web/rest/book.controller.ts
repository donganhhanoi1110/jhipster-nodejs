import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { BookDTO } from '../../service/dto/book.dto';
import { BookService } from '../../service/book.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/books')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('books')
export class BookController {
    logger = new Logger('BookController');

    constructor(private readonly bookService: BookService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: BookDTO,
    })
    async getAll(@Req() req: Request): Promise<BookDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.bookService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: BookDTO,
    })
    async getOne(@Param('id') id: string): Promise<BookDTO> {
        return await this.bookService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create book' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: BookDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() bookDTO: BookDTO): Promise<BookDTO> {
        const created = await this.bookService.save(bookDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Book', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update book' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: BookDTO,
    })
    async put(@Req() req: Request, @Body() bookDTO: BookDTO): Promise<BookDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Book', bookDTO.id);
        return await this.bookService.update(bookDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete book' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Book', id);
        return await this.bookService.deleteById(id);
    }
}
